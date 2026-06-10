package usecases

import (
	"context"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/impropo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/services"
	"github.com/google/uuid"
)

type CreateImprovementInput struct {
	Description    string
	FunctionPoints float64
	LimitDate      time.Time
}

type UpdateImprovementInput struct {
	Description    string
	FunctionPoints float64
	LimitDate      time.Time
}

type ImprovementUsecase struct {
	improveRepo impropo.ImprovementRepository
	factory     *services.TaskChildFactory
}

func NewImprovementUsecase(improveRepo impropo.ImprovementRepository, factory *services.TaskChildFactory) *ImprovementUsecase {
	return &ImprovementUsecase{improveRepo: improveRepo, factory: factory}
}

func (u *ImprovementUsecase) Create(ctx context.Context, taskID uuid.UUID, input CreateImprovementInput) (*models.Improvement, error) {
	return u.factory.CreateImprovement(ctx, services.TaskChildInput{
		TaskID:         taskID,
		Description:    input.Description,
		FunctionPoints: input.FunctionPoints,
		LimitDate:      input.LimitDate,
	})
}

func (u *ImprovementUsecase) List(ctx context.Context, taskID uuid.UUID) ([]models.Improvement, error) {
	return u.improveRepo.FindByTaskID(ctx, taskID)
}

func (u *ImprovementUsecase) GetByID(ctx context.Context, id uuid.UUID) (*models.Improvement, error) {
	return u.improveRepo.FindByID(ctx, id)
}

func (u *ImprovementUsecase) Update(ctx context.Context, id uuid.UUID, input UpdateImprovementInput) (*models.Improvement, error) {
	imp, err := u.improveRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	imp.Description = input.Description
	imp.FunctionPoints = input.FunctionPoints
	imp.LimitDate = input.LimitDate
	imp.UpdatedAt = time.Now().UTC()
	if err := u.improveRepo.Update(ctx, imp); err != nil {
		return nil, err
	}
	return imp, nil
}

func (u *ImprovementUsecase) Delete(ctx context.Context, id uuid.UUID) error {
	return u.improveRepo.Delete(ctx, id)
}
