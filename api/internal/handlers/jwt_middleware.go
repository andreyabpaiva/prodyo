package handlers

import (
	"context"
	"net/http"

	"github.com/andreyapaiva/prodyo/apps/api/internal/services"
	"github.com/google/uuid"
)

type contextKey string

const userIDKey contextKey = "userID"

func JWTMiddleware(authService *services.AuthService) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			cookie, err := r.Cookie("prodyo_token")
			if err != nil {
				respondError(w, http.StatusUnauthorized, "missing authentication")
				return
			}

			claims, err := authService.Parse(cookie.Value)
			if err != nil {
				respondError(w, http.StatusUnauthorized, "invalid token")
				return
			}

			userID, err := uuid.Parse(claims.UserID)
			if err != nil {
				respondError(w, http.StatusUnauthorized, "invalid token")
				return
			}

			ctx := context.WithValue(r.Context(), userIDKey, userID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func UserIDFromContext(ctx context.Context) (uuid.UUID, bool) {
	id, ok := ctx.Value(userIDKey).(uuid.UUID)
	return id, ok
}
