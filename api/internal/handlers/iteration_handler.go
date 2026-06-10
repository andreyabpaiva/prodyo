package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type IterationHandler struct {
	usecase *usecases.IterationUsecase
}

func NewIterationHandler(uc *usecases.IterationUsecase) *IterationHandler {
	return &IterationHandler{usecase: uc}
}

func (h *IterationHandler) List(w http.ResponseWriter, r *http.Request) {
	projectID, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	iterations, err := h.usecase.List(r.Context(), projectID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, iterations)
}

func (h *IterationHandler) Create(w http.ResponseWriter, r *http.Request) {
	projectID, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	var body struct {
		Goal      string    `json:"goal"`
		StartAt   time.Time `json:"start_at"`
		EndAt     time.Time `json:"end_at"`
		Increment int32     `json:"increment"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if body.StartAt.IsZero() || body.EndAt.IsZero() {
		respondError(w, http.StatusBadRequest, "start_at and end_at are required")
		return
	}
	if !body.EndAt.After(body.StartAt) {
		respondError(w, http.StatusBadRequest, "end_at must be after start_at")
		return
	}

	iter, err := h.usecase.Create(r.Context(), projectID, usecases.CreateIterationInput{
		Goal:      strings.TrimSpace(body.Goal),
		StartAt:   body.StartAt,
		EndAt:     body.EndAt,
		Increment: body.Increment,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusCreated, iter)
}

func (h *IterationHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "iterationId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid iteration id")
		return
	}

	iter, err := h.usecase.GetByID(r.Context(), id)
	if err != nil {
		respondError(w, http.StatusNotFound, "iteration not found")
		return
	}
	respondJSON(w, http.StatusOK, iter)
}

func (h *IterationHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "iterationId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid iteration id")
		return
	}

	var body struct {
		Goal      string                 `json:"goal"`
		StartAt   time.Time              `json:"start_at"`
		EndAt     time.Time              `json:"end_at"`
		Status    models.IterationStatus `json:"status"`
		Increment int32                  `json:"increment"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if body.StartAt.IsZero() || body.EndAt.IsZero() {
		respondError(w, http.StatusBadRequest, "start_at and end_at are required")
		return
	}
	if !body.EndAt.After(body.StartAt) {
		respondError(w, http.StatusBadRequest, "end_at must be after start_at")
		return
	}

	iter, err := h.usecase.Update(r.Context(), id, usecases.UpdateIterationInput{
		Goal:      strings.TrimSpace(body.Goal),
		StartAt:   body.StartAt,
		EndAt:     body.EndAt,
		Status:    body.Status,
		Increment: body.Increment,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, iter)
}

func (h *IterationHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "iterationId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid iteration id")
		return
	}

	if err := h.usecase.Delete(r.Context(), id); err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
