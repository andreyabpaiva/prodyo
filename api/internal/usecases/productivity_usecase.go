package usecases

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/bugrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/impropo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/iterrepo"
	"github.com/andreyapaiva/prodyo/apps/api/internal/repositories/taskrepo"
	"github.com/google/uuid"
)

type IterationMetrics struct {
	IterationID      uuid.UUID `json:"iteration_id"`
	Velocity         float64   `json:"velocity"`
	InstabilityIndex float64   `json:"instability_index"`
	ReworkIndex      float64   `json:"rework_index"`
}

type ProjectMetrics struct {
	ProjectID  uuid.UUID          `json:"project_id"`
	Iterations []IterationMetrics `json:"iterations"`
}

type ProductivityUsecase struct {
	iterRepo    iterrepo.IterationRepository
	taskRepo    taskrepo.TaskRepository
	bugRepo     bugrepo.BugRepository
	improveRepo impropo.ImprovementRepository
}

func NewProductivityUsecase(
	iterRepo iterrepo.IterationRepository,
	taskRepo taskrepo.TaskRepository,
	bugRepo bugrepo.BugRepository,
	improveRepo impropo.ImprovementRepository,
) *ProductivityUsecase {
	return &ProductivityUsecase{
		iterRepo:    iterRepo,
		taskRepo:    taskRepo,
		bugRepo:     bugRepo,
		improveRepo: improveRepo,
	}
}

func (u *ProductivityUsecase) ComputeIteration(ctx context.Context, iterationID uuid.UUID) (IterationMetrics, error) {
	agg, err := u.taskRepo.AggregateByIterationID(ctx, iterationID)
	if err != nil {
		return IterationMetrics{}, err
	}

	bugFP, err := u.bugRepo.SumFunctionPointsByIterationID(ctx, iterationID)
	if err != nil {
		return IterationMetrics{}, err
	}

	improveFP, err := u.improveRepo.SumFunctionPointsByIterationID(ctx, iterationID)
	if err != nil {
		return IterationMetrics{}, err
	}

	return IterationMetrics{
		IterationID:      iterationID,
		Velocity:         velocity(agg.TotalExpectedTime, agg.TotalTimeSpent),
		InstabilityIndex: ratio(improveFP, agg.TotalFunctionPoints),
		ReworkIndex:      ratio(bugFP, agg.TotalFunctionPoints),
	}, nil
}

func (u *ProductivityUsecase) ComputeProject(ctx context.Context, projectID uuid.UUID) (ProjectMetrics, error) {
	iterations, err := u.iterRepo.FindByProjectID(ctx, projectID)
	if err != nil {
		return ProjectMetrics{}, err
	}

	metrics := make([]IterationMetrics, 0, len(iterations))
	for _, iter := range iterations {
		m, err := u.ComputeIteration(ctx, iter.ID)
		if err != nil {
			return ProjectMetrics{}, err
		}
		metrics = append(metrics, m)
	}

	return ProjectMetrics{ProjectID: projectID, Iterations: metrics}, nil
}

func velocity(expectedTime, timeSpent int64) float64 {
	if timeSpent == 0 {
		return 0
	}
	return (float64(expectedTime) / float64(timeSpent)) * 100
}

func ratio(numerator, denominator float64) float64 {
	if denominator == 0 {
		return 0
	}
	return (numerator / denominator) * 100
}
