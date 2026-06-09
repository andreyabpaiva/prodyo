package handlers

import (
	"net/http"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/config"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewRouter(c *config.Container) http.Handler {
	authHandler := NewAuthHandler(c.AuthUsecase)

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
	})

	return r
}
