package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type TaskHandler struct {
	usecase *usecases.TaskUsecase
}

func NewTaskHandler(uc *usecases.TaskUsecase) *TaskHandler {
	return &TaskHandler{usecase: uc}
}

func (h *TaskHandler) List(w http.ResponseWriter, r *http.Request) {
	iterationID, err := uuid.Parse(chi.URLParam(r, "iterationId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid iteration id")
		return
	}

	tasks, err := h.usecase.List(r.Context(), iterationID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, tasks)
}

func (h *TaskHandler) Create(w http.ResponseWriter, r *http.Request) {
	iterationID, err := uuid.Parse(chi.URLParam(r, "iterationId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid iteration id")
		return
	}

	var body struct {
		Title          string     `json:"title"`
		Description    string     `json:"description"`
		Tags           []string   `json:"tags"`
		FunctionPoints float64    `json:"function_points"`
		ExpectedTime   int64      `json:"expected_time"`
		AssigneeID     *uuid.UUID `json:"assignee_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Title) == "" {
		respondError(w, http.StatusBadRequest, "title is required")
		return
	}
	if body.Tags == nil {
		body.Tags = []string{}
	}

	task, err := h.usecase.Create(r.Context(), iterationID, usecases.CreateTaskInput{
		Title:          strings.TrimSpace(body.Title),
		Description:    strings.TrimSpace(body.Description),
		Tags:           body.Tags,
		FunctionPoints: body.FunctionPoints,
		ExpectedTime:   utils.Seconds(body.ExpectedTime),
		AssigneeID:     body.AssigneeID,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusCreated, task)
}

func (h *TaskHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "taskId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	task, err := h.usecase.GetByID(r.Context(), id)
	if err != nil {
		respondError(w, http.StatusNotFound, "task not found")
		return
	}
	respondJSON(w, http.StatusOK, task)
}

func (h *TaskHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "taskId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	var body struct {
		Title          string            `json:"title"`
		Description    string            `json:"description"`
		Status         models.TaskStatus `json:"status"`
		Tags           []string          `json:"tags"`
		FunctionPoints float64           `json:"function_points"`
		ExpectedTime   int64             `json:"expected_time"`
		TimeSpent      int64             `json:"time_spent"`
		AssigneeID     *uuid.UUID        `json:"assignee_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Title) == "" {
		respondError(w, http.StatusBadRequest, "title is required")
		return
	}
	if body.Tags == nil {
		body.Tags = []string{}
	}

	task, err := h.usecase.Update(r.Context(), id, usecases.UpdateTaskInput{
		Title:          strings.TrimSpace(body.Title),
		Description:    strings.TrimSpace(body.Description),
		Status:         body.Status,
		Tags:           body.Tags,
		FunctionPoints: body.FunctionPoints,
		ExpectedTime:   utils.Seconds(body.ExpectedTime),
		TimeSpent:      utils.Seconds(body.TimeSpent),
		AssigneeID:     body.AssigneeID,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, task)
}

func (h *TaskHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "taskId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	if err := h.usecase.Delete(r.Context(), id); err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
