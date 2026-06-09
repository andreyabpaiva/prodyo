package impropo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
)

type ImprovementRepository interface {
	Create(ctx context.Context, improvement *models.Improvement) error
	FindByID(ctx context.Context, id uuid.UUID) (*models.Improvement, error)
	FindByTaskID(ctx context.Context, taskID uuid.UUID) ([]models.Improvement, error)
	Update(ctx context.Context, improvement *models.Improvement) error
	Delete(ctx context.Context, id uuid.UUID) error
}
