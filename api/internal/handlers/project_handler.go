package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/andreyapaiva/prodyo/apps/api/internal/usecases"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type ProjectHandler struct {
	usecase *usecases.ProjectUsecase
}

func NewProjectHandler(uc *usecases.ProjectUsecase) *ProjectHandler {
	return &ProjectHandler{usecase: uc}
}

func (h *ProjectHandler) Create(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	var body struct {
		Name        string   `json:"name"`
		Description string   `json:"description"`
		Tags        []string `json:"tags"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Name) == "" {
		respondError(w, http.StatusBadRequest, "name is required")
		return
	}
	if body.Tags == nil {
		body.Tags = []string{}
	}

	project, err := h.usecase.Create(r.Context(), userID, usecases.CreateProjectInput{
		Name:        strings.TrimSpace(body.Name),
		Description: strings.TrimSpace(body.Description),
		Tags:        body.Tags,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusCreated, project)
}

func (h *ProjectHandler) List(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		respondError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	projects, err := h.usecase.List(r.Context(), userID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, projects)
}

func (h *ProjectHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	project, err := h.usecase.GetByID(r.Context(), id)
	if err != nil {
		respondError(w, http.StatusNotFound, "project not found")
		return
	}
	respondJSON(w, http.StatusOK, project)
}

func (h *ProjectHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	var body struct {
		Name        string   `json:"name"`
		Description string   `json:"description"`
		Tags        []string `json:"tags"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if strings.TrimSpace(body.Name) == "" {
		respondError(w, http.StatusBadRequest, "name is required")
		return
	}
	if body.Tags == nil {
		body.Tags = []string{}
	}

	project, err := h.usecase.Update(r.Context(), id, usecases.UpdateProjectInput{
		Name:        strings.TrimSpace(body.Name),
		Description: strings.TrimSpace(body.Description),
		Tags:        body.Tags,
	})
	if err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	respondJSON(w, http.StatusOK, project)
}

func (h *ProjectHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "projectId"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "invalid project id")
		return
	}

	if err := h.usecase.Delete(r.Context(), id); err != nil {
		respondError(w, http.StatusInternalServerError, "internal error")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
