package handlers

import (
	"context"
	"net/http"

	"github.com/andreyapaiva/prodyo/apps/api/internal/config"
	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

const memberKey contextKey = "member"

func RequireProjectMember(c *config.Container, roles ...models.Role) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID, ok := UserIDFromContext(r.Context())
			if !ok {
				respondError(w, http.StatusUnauthorized, "unauthorized")
				return
			}

			projectID, err := uuid.Parse(chi.URLParam(r, "projectId"))
			if err != nil {
				respondError(w, http.StatusBadRequest, "invalid project id")
				return
			}

			member, err := c.MemberRepo.FindByUserAndProject(r.Context(), userID, projectID)
			if err != nil {
				respondError(w, http.StatusForbidden, "not a project member")
				return
			}

			if len(roles) > 0 && !memberHasAnyRole(member, roles) {
				respondError(w, http.StatusForbidden, "insufficient permissions")
				return
			}

			ctx := context.WithValue(r.Context(), memberKey, member)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func MemberFromContext(ctx context.Context) (*models.Member, bool) {
	m, ok := ctx.Value(memberKey).(*models.Member)
	return m, ok
}

func memberHasAnyRole(member *models.Member, roles []models.Role) bool {
	for _, required := range roles {
		for _, has := range member.Roles {
			if has == required {
				return true
			}
		}
	}
	return false
}
