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

type BugHandler struct {
	usecase *usecases.BugUsecase
}

func NewBugHandler(uc *usecases.BugUsecase) *BugHandler {
	return &BugHandler{usecase: uc}
}

func (h *BugHandler) List(w http.ResponseWriter, r *http.Request) {
	taskID, err := uuid.Parse(chi.URLParam(r, "taskId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	bugs, err := h.usecase.List(r.Context(), taskID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, bugs)
}

func (h *BugHandler) Create(w http.ResponseWriter, r *http.Request) {
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

	bug, err := h.usecase.Create(r.Context(), taskID, usecases.CreateBugInput{
		Description:    strings.TrimSpace(body.Description),
		FunctionPoints: body.FunctionPoints,
		LimitDate:      body.LimitDate,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusCreated, bug)
}

func (h *BugHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "bugId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid bug id")
		return
	}

	bug, err := h.usecase.GetByID(r.Context(), id)
	if err != nil {
		respondError(w, http.StatusNotFound, "bug not found")
		return
	}
	respondJSON(w, http.StatusOK, bug)
}

func (h *BugHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "bugId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid bug id")
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

	bug, err := h.usecase.Update(r.Context(), id, usecases.UpdateBugInput{
		Description:    strings.TrimSpace(body.Description),
		FunctionPoints: body.FunctionPoints,
		LimitDate:      body.LimitDate,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, bug)
}

func (h *BugHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "bugId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid bug id")
		return
	}

	if err := h.usecase.Delete(r.Context(), id); err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
