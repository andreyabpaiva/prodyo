package projectrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
)

type ProjectRepository interface {
	Create(ctx context.Context, project *models.Project) error
	FindByID(ctx context.Context, id uuid.UUID) (*models.Project, error)
	FindByUserID(ctx context.Context, userID uuid.UUID) ([]models.Project, error)
	Update(ctx context.Context, project *models.Project) error
	Delete(ctx context.Context, id uuid.UUID) error
}
