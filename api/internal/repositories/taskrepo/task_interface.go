package taskrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
)

type TaskAggregates struct {
	TotalFunctionPoints float64
	TotalExpectedTime   int64
	TotalTimeSpent      int64
}

type TaskRepository interface {
	Create(ctx context.Context, task *models.Task) error
	FindByID(ctx context.Context, id uuid.UUID) (*models.Task, error)
	FindByIterationID(ctx context.Context, iterationID uuid.UUID) ([]models.Task, error)
	AggregateByIterationID(ctx context.Context, iterationID uuid.UUID) (TaskAggregates, error)
	Update(ctx context.Context, task *models.Task) error
	Delete(ctx context.Context, id uuid.UUID) error
}
