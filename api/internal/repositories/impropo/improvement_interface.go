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
	SumFunctionPointsByIterationID(ctx context.Context, iterationID uuid.UUID) (float64, error)
	Update(ctx context.Context, improvement *models.Improvement) error
	Delete(ctx context.Context, id uuid.UUID) error
}
