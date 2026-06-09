package memberrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
)

type MemberRepository interface {
	Create(ctx context.Context, member *models.Member) error
	FindByProjectID(ctx context.Context, projectID uuid.UUID) ([]models.Member, error)
	FindByUserAndProject(ctx context.Context, userID, projectID uuid.UUID) (*models.Member, error)
	Update(ctx context.Context, member *models.Member) error
	Delete(ctx context.Context, id uuid.UUID) error
}
