package handlers

import (
	"net/http"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/config"
	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewRouter(c *config.Container) http.Handler {
	authHandler := NewAuthHandler(c.AuthUsecase)

	projectHandler := NewProjectHandler(usecases.NewProjectUsecase(c.ProjectRepo, c.MemberRepo))
	memberHandler := NewMemberHandler(usecases.NewMemberUsecase(c.MemberRepo))
	iterationHandler := NewIterationHandler(usecases.NewIterationUsecase(c.IterationRepo))
	taskHandler := NewTaskHandler(usecases.NewTaskUsecase(c.TaskRepo))
	bugHandler := NewBugHandler(usecases.NewBugUsecase(c.BugRepo, c.TaskChildFactory))
	improvementHandler := NewImprovementHandler(usecases.NewImprovementUsecase(c.ImprovementRepo, c.TaskChildFactory))

	anyMember := RequireProjectMember(c)
	ownerAdmin := RequireProjectMember(c, models.RoleOwner, models.RoleAdmin)
	ownerOnly := RequireProjectMember(c, models.RoleOwner)

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))
	r.Use(corsMiddleware(c.Config.CORSAllowedOrigins))

	r.Get("/health", func(w http.ResponseWriter, req *http.Request) {
		respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	r.Group(func(r chi.Router) {
		r.Post("/api/auth/register", authHandler.Register)
		r.Post("/api/auth/login", authHandler.Login)
	})

	r.Group(func(r chi.Router) {
		r.Use(JWTMiddleware(c.AuthService))

		r.Post("/api/auth/logout", authHandler.Logout)
		r.Get("/api/auth/me", authHandler.Me)

		r.Post("/api/projects", projectHandler.Create)
		r.Get("/api/projects", projectHandler.List)

		r.Route("/api/projects/{projectId}", func(r chi.Router) {
			r.With(anyMember).Get("/", projectHandler.GetByID)
			r.With(ownerAdmin).Put("/", projectHandler.Update)
			r.With(ownerOnly).Delete("/", projectHandler.Delete)

			r.With(anyMember).Get("/members", memberHandler.List)
			r.With(ownerAdmin).Post("/members", memberHandler.Add)
			r.With(ownerAdmin).Put("/members/{memberId}", memberHandler.Update)
			r.With(ownerOnly).Delete("/members/{memberId}", memberHandler.Remove)

			r.With(anyMember).Get("/iterations", iterationHandler.List)
			r.With(ownerAdmin).Post("/iterations", iterationHandler.Create)
			r.With(anyMember).Get("/iterations/{iterationId}", iterationHandler.GetByID)
			r.With(ownerAdmin).Put("/iterations/{iterationId}", iterationHandler.Update)
			r.With(ownerAdmin).Delete("/iterations/{iterationId}", iterationHandler.Delete)

			r.With(anyMember).Get("/iterations/{iterationId}/tasks", taskHandler.List)
			r.With(anyMember).Post("/iterations/{iterationId}/tasks", taskHandler.Create)
			r.With(anyMember).Get("/iterations/{iterationId}/tasks/{taskId}", taskHandler.GetByID)
			r.With(anyMember).Put("/iterations/{iterationId}/tasks/{taskId}", taskHandler.Update)
			r.With(ownerAdmin).Delete("/iterations/{iterationId}/tasks/{taskId}", taskHandler.Delete)

			r.With(anyMember).Get("/iterations/{iterationId}/tasks/{taskId}/bugs", bugHandler.List)
			r.With(anyMember).Post("/iterations/{iterationId}/tasks/{taskId}/bugs", bugHandler.Create)
			r.With(anyMember).Get("/iterations/{iterationId}/tasks/{taskId}/bugs/{bugId}", bugHandler.GetByID)
			r.With(anyMember).Put("/iterations/{iterationId}/tasks/{taskId}/bugs/{bugId}", bugHandler.Update)
			r.With(ownerAdmin).Delete("/iterations/{iterationId}/tasks/{taskId}/bugs/{bugId}", bugHandler.Delete)

			r.With(anyMember).Get("/iterations/{iterationId}/tasks/{taskId}/improvements", improvementHandler.List)
			r.With(anyMember).Post("/iterations/{iterationId}/tasks/{taskId}/improvements", improvementHandler.Create)
			r.With(anyMember).Get("/iterations/{iterationId}/tasks/{taskId}/improvements/{improvementId}", improvementHandler.GetByID)
			r.With(anyMember).Put("/iterations/{iterationId}/tasks/{taskId}/improvements/{improvementId}", improvementHandler.Update)
			r.With(ownerAdmin).Delete("/iterations/{iterationId}/tasks/{taskId}/improvements/{improvementId}", improvementHandler.Delete)
		})
	})

	return r
}
