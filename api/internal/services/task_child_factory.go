package services

import (
	"context"
	"errors"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/bugrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/impropo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/taskrepo"
	"github.com/google/uuid"
)

var ErrTaskNotFound = errors.New("task not found")

type TaskChildInput struct {
	TaskID         uuid.UUID
	Description    string
	FunctionPoints float64
	LimitDate      time.Time
}

type TaskChildFactory struct {
	taskRepo    taskrepo.TaskRepository
	bugRepo     bugrepo.BugRepository
	improveRepo impropo.ImprovementRepository
}

func NewTaskChildFactory(
	taskRepo taskrepo.TaskRepository,
	bugRepo bugrepo.BugRepository,
	improveRepo impropo.ImprovementRepository,
) *TaskChildFactory {
	return &TaskChildFactory{taskRepo: taskRepo, bugRepo: bugRepo, improveRepo: improveRepo}
}

func (f *TaskChildFactory) CreateBug(ctx context.Context, input TaskChildInput) (*models.Bug, error) {
	if _, err := f.taskRepo.FindByID(ctx, input.TaskID); err != nil {
		return nil, ErrTaskNotFound
	}
	now := time.Now().UTC()
	bug := &models.Bug{
		TaskChild: models.TaskChild{
			ID:             uuid.New(),
			TaskID:         input.TaskID,
			Description:    input.Description,
			FunctionPoints: input.FunctionPoints,
			LimitDate:      input.LimitDate,
			CreatedAt:      now,
			UpdatedAt:      now,
		},
	}
	if err := f.bugRepo.Create(ctx, bug); err != nil {
		return nil, err
	}
	return bug, nil
}

func (f *TaskChildFactory) CreateImprovement(ctx context.Context, input TaskChildInput) (*models.Improvement, error) {
	if _, err := f.taskRepo.FindByID(ctx, input.TaskID); err != nil {
		return nil, ErrTaskNotFound
	}
	now := time.Now().UTC()
	imp := &models.Improvement{
		TaskChild: models.TaskChild{
			ID:             uuid.New(),
			TaskID:         input.TaskID,
			Description:    input.Description,
			FunctionPoints: input.FunctionPoints,
			LimitDate:      input.LimitDate,
			CreatedAt:      now,
			UpdatedAt:      now,
		},
	}
	if err := f.improveRepo.Create(ctx, imp); err != nil {
		return nil, err
	}
	return imp, nil
}
