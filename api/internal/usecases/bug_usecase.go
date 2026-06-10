package usecases

import (
	"context"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/bugrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/services"
	"github.com/google/uuid"
)

type CreateBugInput struct {
	Description    string
	FunctionPoints float64
	LimitDate      time.Time
}

type UpdateBugInput struct {
	Description    string
	FunctionPoints float64
	LimitDate      time.Time
}

type BugUsecase struct {
	bugRepo bugrepo.BugRepository
	factory *services.TaskChildFactory
}

func NewBugUsecase(bugRepo bugrepo.BugRepository, factory *services.TaskChildFactory) *BugUsecase {
	return &BugUsecase{bugRepo: bugRepo, factory: factory}
}

func (u *BugUsecase) Create(ctx context.Context, taskID uuid.UUID, input CreateBugInput) (*models.Bug, error) {
	return u.factory.CreateBug(ctx, services.TaskChildInput{
		TaskID:         taskID,
		Description:    input.Description,
		FunctionPoints: input.FunctionPoints,
		LimitDate:      input.LimitDate,
	})
}

func (u *BugUsecase) List(ctx context.Context, taskID uuid.UUID) ([]models.Bug, error) {
	return u.bugRepo.FindByTaskID(ctx, taskID)
}

func (u *BugUsecase) GetByID(ctx context.Context, id uuid.UUID) (*models.Bug, error) {
	return u.bugRepo.FindByID(ctx, id)
}

func (u *BugUsecase) Update(ctx context.Context, id uuid.UUID, input UpdateBugInput) (*models.Bug, error) {
	bug, err := u.bugRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	bug.Description = input.Description
	bug.FunctionPoints = input.FunctionPoints
	bug.LimitDate = input.LimitDate
	bug.UpdatedAt = time.Now().UTC()
	if err := u.bugRepo.Update(ctx, bug); err != nil {
		return nil, err
	}
	return bug, nil
}

func (u *BugUsecase) Delete(ctx context.Context, id uuid.UUID) error {
	return u.bugRepo.Delete(ctx, id)
}
