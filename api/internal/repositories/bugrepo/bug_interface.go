package bugrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
)

type BugRepository interface {
	Create(ctx context.Context, bug *models.Bug) error
	FindByID(ctx context.Context, id uuid.UUID) (*models.Bug, error)
	FindByTaskID(ctx context.Context, taskID uuid.UUID) ([]models.Bug, error)
	SumFunctionPointsByIterationID(ctx context.Context, iterationID uuid.UUID) (float64, error)
	Update(ctx context.Context, bug *models.Bug) error
	Delete(ctx context.Context, id uuid.UUID) error
}
