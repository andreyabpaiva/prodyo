package impropo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxImprovementRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) ImprovementRepository {
	return &sqlxImprovementRepository{db: db}
}

func (r *sqlxImprovementRepository) Create(ctx context.Context, improvement *models.Improvement) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO improvements (id, task_id, description, function_points, limit_date, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		improvement.ID, improvement.TaskID, improvement.Description, improvement.FunctionPoints,
		improvement.LimitDate, improvement.CreatedAt, improvement.UpdatedAt,
	)
	return err
}

func (r *sqlxImprovementRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.Improvement, error) {
	var imp models.Improvement
	if err := r.db.GetContext(ctx, &imp, `SELECT * FROM improvements WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &imp, nil
}

func (r *sqlxImprovementRepository) FindByTaskID(ctx context.Context, taskID uuid.UUID) ([]models.Improvement, error) {
	var improvements []models.Improvement
	err := r.db.SelectContext(ctx, &improvements,
		`SELECT * FROM improvements WHERE task_id = ? ORDER BY created_at ASC`, taskID,
	)
	return improvements, err
}

func (r *sqlxImprovementRepository) SumFunctionPointsByIterationID(ctx context.Context, iterationID uuid.UUID) (float64, error) {
	var total float64
	err := r.db.GetContext(ctx, &total,
		`SELECT COALESCE(SUM(i.function_points), 0)
		 FROM improvements i
		 INNER JOIN tasks t ON t.id = i.task_id
		 WHERE t.iteration_id = ?`,
		iterationID,
	)
	return total, err
}

func (r *sqlxImprovementRepository) Update(ctx context.Context, improvement *models.Improvement) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE improvements SET description = ?, function_points = ?, limit_date = ?, updated_at = ? WHERE id = ?`,
		improvement.Description, improvement.FunctionPoints, improvement.LimitDate, improvement.UpdatedAt, improvement.ID,
	)
	return err
}

func (r *sqlxImprovementRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM improvements WHERE id = ?`, id)
	return err
}
