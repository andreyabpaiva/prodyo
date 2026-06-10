package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type MemberHandler struct {
	usecase *usecases.MemberUsecase
}

func NewMemberHandler(uc *usecases.MemberUsecase) *MemberHandler {
	return &MemberHandler{usecase: uc}
}

func (h *MemberHandler) List(w http.ResponseWriter, r *http.Request) {
	projectID, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	members, err := h.usecase.List(r.Context(), projectID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, members)
}

func (h *MemberHandler) Add(w http.ResponseWriter, r *http.Request) {
	projectID, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	var body struct {
		UserID uuid.UUID      `json:"user_id"`
		Roles  []models.Role  `json:"roles"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if body.UserID == uuid.Nil {
		respondError(w, http.StatusBadRequest, "user_id is required")
		return
	}
	if len(body.Roles) == 0 {
		respondError(w, http.StatusBadRequest, "at least one role is required")
		return
	}

	member, err := h.usecase.Add(r.Context(), projectID, usecases.AddMemberInput{
		UserID: body.UserID,
		Roles:  body.Roles,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusCreated, member)
}

func (h *MemberHandler) Update(w http.ResponseWriter, r *http.Request) {
	memberID, err := uuid.Parse(chi.URLParam(r, "memberId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid member id")
		return
	}

	var body struct {
		Roles []models.Role `json:"roles"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if len(body.Roles) == 0 {
		respondError(w, http.StatusBadRequest, "at least one role is required")
		return
	}

	member, err := h.usecase.Update(r.Context(), memberID, usecases.UpdateMemberInput{
		Roles: body.Roles,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, member)
}

func (h *MemberHandler) Remove(w http.ResponseWriter, r *http.Request) {
	memberID, err := uuid.Parse(chi.URLParam(r, "memberId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid member id")
		return
	}

	if err := h.usecase.Remove(r.Context(), memberID); err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
