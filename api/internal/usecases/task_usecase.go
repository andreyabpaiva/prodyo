package usecases

import (
	"context"
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/taskrepo"
	"github.com/google/uuid"
)

type CreateTaskInput struct {
	Title          string
	Description    string
	Tags           []string
	FunctionPoints float64
	ExpectedTime   utils.Seconds
	AssigneeID     *uuid.UUID
}

type UpdateTaskInput struct {
	Title          string
	Description    string
	Status         models.TaskStatus
	Tags           []string
	FunctionPoints float64
	ExpectedTime   utils.Seconds
	TimeSpent      utils.Seconds
	AssigneeID     *uuid.UUID
}

type TaskUsecase struct {
	taskRepo taskrepo.TaskRepository
}

func NewTaskUsecase(taskRepo taskrepo.TaskRepository) *TaskUsecase {
	return &TaskUsecase{taskRepo: taskRepo}
}

func (u *TaskUsecase) Create(ctx context.Context, iterationID uuid.UUID, input CreateTaskInput) (*models.Task, error) {
	now := time.Now().UTC()
	task := &models.Task{
		ID:             uuid.New(),
		IterationID:    iterationID,
		Title:          input.Title,
		Description:    input.Description,
		Status:         models.TaskStatusBacklog,
		Tags:           utils.StringSlice(input.Tags),
		FunctionPoints: input.FunctionPoints,
		ExpectedTime:   input.ExpectedTime,
		TimeSpent:      0,
		AssigneeID:     input.AssigneeID,
		CreatedAt:      now,
		UpdatedAt:      now,
	}
	if err := u.taskRepo.Create(ctx, task); err != nil {
		return nil, err
	}
	return task, nil
}

func (u *TaskUsecase) List(ctx context.Context, iterationID uuid.UUID) ([]models.Task, error) {
	return u.taskRepo.FindByIterationID(ctx, iterationID)
}

func (u *TaskUsecase) GetByID(ctx context.Context, id uuid.UUID) (*models.Task, error) {
	return u.taskRepo.FindByID(ctx, id)
}

func (u *TaskUsecase) Update(ctx context.Context, id uuid.UUID, input UpdateTaskInput) (*models.Task, error) {
	task, err := u.taskRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	task.Title = input.Title
	task.Description = input.Description
	task.Status = input.Status
	task.Tags = utils.StringSlice(input.Tags)
	task.FunctionPoints = input.FunctionPoints
	task.ExpectedTime = input.ExpectedTime
	task.TimeSpent = input.TimeSpent
	task.AssigneeID = input.AssigneeID
	task.UpdatedAt = time.Now().UTC()
	if err := u.taskRepo.Update(ctx, task); err != nil {
		return nil, err
	}
	return task, nil
}

func (u *TaskUsecase) Delete(ctx context.Context, id uuid.UUID) error {
	return u.taskRepo.Delete(ctx, id)
}
