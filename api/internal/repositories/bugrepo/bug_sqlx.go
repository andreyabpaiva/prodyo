package bugrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxBugRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) BugRepository {
	return &sqlxBugRepository{db: db}
}

func (r *sqlxBugRepository) Create(ctx context.Context, bug *models.Bug) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO bugs (id, task_id, description, function_points, limit_date, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		bug.ID, bug.TaskID, bug.Description, bug.FunctionPoints, bug.LimitDate, bug.CreatedAt, bug.UpdatedAt,
	)
	return err
}

func (r *sqlxBugRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.Bug, error) {
	var bug models.Bug
	if err := r.db.GetContext(ctx, &bug, `SELECT * FROM bugs WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &bug, nil
}

func (r *sqlxBugRepository) FindByTaskID(ctx context.Context, taskID uuid.UUID) ([]models.Bug, error) {
	var bugs []models.Bug
	err := r.db.SelectContext(ctx, &bugs,
		`SELECT * FROM bugs WHERE task_id = ? ORDER BY created_at ASC`, taskID,
	)
	return bugs, err
}

func (r *sqlxBugRepository) SumFunctionPointsByIterationID(ctx context.Context, iterationID uuid.UUID) (float64, error) {
	var total float64
	err := r.db.GetContext(ctx, &total,
		`SELECT COALESCE(SUM(b.function_points), 0)
		 FROM bugs b
		 INNER JOIN tasks t ON t.id = b.task_id
		 WHERE t.iteration_id = ?`,
		iterationID,
	)
	return total, err
}

func (r *sqlxBugRepository) Update(ctx context.Context, bug *models.Bug) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE bugs SET description = ?, function_points = ?, limit_date = ?, updated_at = ? WHERE id = ?`,
		bug.Description, bug.FunctionPoints, bug.LimitDate, bug.UpdatedAt, bug.ID,
	)
	return err
}

func (r *sqlxBugRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM bugs WHERE id = ?`, id)
	return err
}
