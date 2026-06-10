package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type ImprovementHandler struct {
	usecase *usecases.ImprovementUsecase
}

func NewImprovementHandler(uc *usecases.ImprovementUsecase) *ImprovementHandler {
	return &ImprovementHandler{usecase: uc}
}

func (h *ImprovementHandler) List(w http.ResponseWriter, r *http.Request) {
	taskID, err := uuid.Parse(chi.URLParam(r, "taskId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	improvements, err := h.usecase.List(r.Context(), taskID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, improvements)
}

func (h *ImprovementHandler) Create(w http.ResponseWriter, r *http.Request) {
	taskID, err := uuid.Parse(chi.URLParam(r, "taskId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	var body struct {
		Description    string    `json:"description"`
		FunctionPoints float64   `json:"function_points"`
		LimitDate      time.Time `json:"limit_date"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Description) == "" {
		respondError(w, http.StatusBadRequest, "description is required")
		return
	}
	if body.LimitDate.IsZero() {
		respondError(w, http.StatusBadRequest, "limit_date is required")
		return
	}

	imp, err := h.usecase.Create(r.Context(), taskID, usecases.CreateImprovementInput{
		Description:    strings.TrimSpace(body.Description),
		FunctionPoints: body.FunctionPoints,
		LimitDate:      body.LimitDate,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusCreated, imp)
}

func (h *ImprovementHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "improvementId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid improvement id")
		return
	}

	imp, err := h.usecase.GetByID(r.Context(), id)
	if err != nil {
		respondError(w, http.StatusNotFound, "improvement not found")
		return
	}
	respondJSON(w, http.StatusOK, imp)
}

func (h *ImprovementHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "improvementId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid improvement id")
		return
	}

	var body struct {
		Description    string    `json:"description"`
		FunctionPoints float64   `json:"function_points"`
		LimitDate      time.Time `json:"limit_date"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Description) == "" {
		respondError(w, http.StatusBadRequest, "description is required")
		return
	}

	imp, err := h.usecase.Update(r.Context(), id, usecases.UpdateImprovementInput{
		Description:    strings.TrimSpace(body.Description),
		FunctionPoints: body.FunctionPoints,
		LimitDate:      body.LimitDate,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, imp)
}

func (h *ImprovementHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "improvementId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid improvement id")
		return
	}

	if err := h.usecase.Delete(r.Context(), id); err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
