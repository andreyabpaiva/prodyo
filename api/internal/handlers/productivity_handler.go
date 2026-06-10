package handlers

import (
	"net/http"

	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type ProductivityHandler struct {
	usecase *usecases.ProductivityUsecase
}

func NewProductivityHandler(uc *usecases.ProductivityUsecase) *ProductivityHandler {
	return &ProductivityHandler{usecase: uc}
}

func (h *ProductivityHandler) ProjectMetrics(w http.ResponseWriter, r *http.Request) {
	projectID, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	metrics, err := h.usecase.ComputeProject(r.Context(), projectID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, metrics)
}

func (h *ProductivityHandler) IterationMetrics(w http.ResponseWriter, r *http.Request) {
	iterationID, err := uuid.Parse(chi.URLParam(r, "iterationId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid iteration id")
		return
	}

	metrics, err := h.usecase.ComputeIteration(r.Context(), iterationID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, metrics)
}
