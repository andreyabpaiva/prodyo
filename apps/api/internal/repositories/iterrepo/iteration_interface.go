package iterrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
)

type IterationRepository interface {
	Create(ctx context.Context, iteration *models.Iteration) error
	FindByID(ctx context.Context, id uuid.UUID) (*models.Iteration, error)
	FindByProjectID(ctx context.Context, projectID uuid.UUID) ([]models.Iteration, error)
	Update(ctx context.Context, iteration *models.Iteration) error
	Delete(ctx context.Context, id uuid.UUID) error
}
