package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/google/uuid"
)

type userResponse struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type AuthHandler struct {
	usecase *usecases.AuthUsecase
}

func NewAuthHandler(usecase *usecases.AuthUsecase) *AuthHandler {
	return &AuthHandler{usecase: usecase}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Name) == "" || strings.TrimSpace(body.Email) == "" || body.Password == "" {
		respondError(w, http.StatusBadRequest, "name, email and password are required")
		return
	}

	user, token, err := h.usecase.Register(r.Context(), usecases.RegisterInput{
		Name:     strings.TrimSpace(body.Name),
		Email:    strings.TrimSpace(body.Email),
		Password: body.Password,
	})
	if err != nil {
		if errors.Is(err, usecases.ErrEmailTaken) {
			respondError(w, http.StatusConflict, "email already taken")
			return
		}
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}

	h.usecase.SetCookie(w, token)
	respondJSON(w, http.StatusCreated, userResponse{
		ID: user.ID, Name: user.Name, Email: user.Email,
		CreatedAt: user.CreatedAt, UpdatedAt: user.UpdatedAt,
	})
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Email) == "" || body.Password == "" {
		respondError(w, http.StatusBadRequest, "email and password are required")
		return
	}

	user, token, err := h.usecase.Login(r.Context(), usecases.LoginInput{
		Email:    strings.TrimSpace(body.Email),
		Password: body.Password,
	})
	if err != nil {
		if errors.Is(err, usecases.ErrInvalidCredentials) {
			respondError(w, http.StatusUnauthorized, "invalid credentials")
			return
		}
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}

	h.usecase.SetCookie(w, token)
	respondJSON(w, http.StatusOK, userResponse{
		ID: user.ID, Name: user.Name, Email: user.Email,
		CreatedAt: user.CreatedAt, UpdatedAt: user.UpdatedAt,
	})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	h.usecase.ClearCookie(w)
	w.WriteHeader(http.StatusNoContent)
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "missing authentication")
		return
	}

	user, err := h.usecase.Me(r.Context(), userID)
	if err != nil {
		respondError(w, http.StatusNotFound, "user not found")
		return
	}

	respondJSON(w, http.StatusOK, userResponse{
		ID: user.ID, Name: user.Name, Email: user.Email,
		CreatedAt: user.CreatedAt, UpdatedAt: user.UpdatedAt,
	})
}
