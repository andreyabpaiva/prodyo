package usecases

import (
	"context"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/iterrepo"
	"github.com/google/uuid"
)

type CreateIterationInput struct {
	Goal      string
	StartAt   time.Time
	EndAt     time.Time
	Increment int32
}

type UpdateIterationInput struct {
	Goal      string
	StartAt   time.Time
	EndAt     time.Time
	Status    models.IterationStatus
	Increment int32
}

type IterationUsecase struct {
	iterRepo iterrepo.IterationRepository
}

func NewIterationUsecase(iterRepo iterrepo.IterationRepository) *IterationUsecase {
	return &IterationUsecase{iterRepo: iterRepo}
}

func (u *IterationUsecase) Create(ctx context.Context, projectID uuid.UUID, input CreateIterationInput) (*models.Iteration, error) {
	now := time.Now().UTC()
	iter := &models.Iteration{
		ID:        uuid.New(),
		ProjectID: projectID,
		Goal:      input.Goal,
		StartAt:   input.StartAt,
		EndAt:     input.EndAt,
		Status:    models.IterationStatusPlanned,
		Increment: input.Increment,
		CreatedAt: now,
		UpdatedAt: now,
	}
	if err := u.iterRepo.Create(ctx, iter); err != nil {
		return nil, err
	}
	return iter, nil
}

func (u *IterationUsecase) List(ctx context.Context, projectID uuid.UUID) ([]models.Iteration, error) {
	return u.iterRepo.FindByProjectID(ctx, projectID)
}

func (u *IterationUsecase) GetByID(ctx context.Context, id uuid.UUID) (*models.Iteration, error) {
	return u.iterRepo.FindByID(ctx, id)
}

func (u *IterationUsecase) Update(ctx context.Context, id uuid.UUID, input UpdateIterationInput) (*models.Iteration, error) {
	iter, err := u.iterRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	iter.Goal = input.Goal
	iter.StartAt = input.StartAt
	iter.EndAt = input.EndAt
	iter.Status = input.Status
	iter.Increment = input.Increment
	iter.UpdatedAt = time.Now().UTC()
	if err := u.iterRepo.Update(ctx, iter); err != nil {
		return nil, err
	}
	return iter, nil
}

func (u *IterationUsecase) Delete(ctx context.Context, id uuid.UUID) error {
	return u.iterRepo.Delete(ctx, id)
}
