package taskrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxTaskRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) TaskRepository {
	return &sqlxTaskRepository{db: db}
}

func (r *sqlxTaskRepository) Create(ctx context.Context, task *models.Task) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO tasks
		 (id, iteration_id, title, description, status, tags, function_points, expected_time, time_spent, assignee_id, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		task.ID, task.IterationID, task.Title, task.Description, task.Status, task.Tags,
		task.FunctionPoints, task.ExpectedTime, task.TimeSpent, task.AssigneeID,
		task.CreatedAt, task.UpdatedAt,
	)
	return err
}

func (r *sqlxTaskRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.Task, error) {
	var task models.Task
	if err := r.db.GetContext(ctx, &task, `SELECT * FROM tasks WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *sqlxTaskRepository) FindByIterationID(ctx context.Context, iterationID uuid.UUID) ([]models.Task, error) {
	var tasks []models.Task
	err := r.db.SelectContext(ctx, &tasks,
		`SELECT * FROM tasks WHERE iteration_id = ? ORDER BY created_at ASC`, iterationID,
	)
	return tasks, err
}

func (r *sqlxTaskRepository) AggregateByIterationID(ctx context.Context, iterationID uuid.UUID) (TaskAggregates, error) {
	var row struct {
		TotalFunctionPoints float64 `db:"total_fp"`
		TotalExpectedTime   int64   `db:"total_expected_time"`
		TotalTimeSpent      int64   `db:"total_time_spent"`
	}
	err := r.db.GetContext(ctx, &row,
		`SELECT
			COALESCE(SUM(function_points), 0) AS total_fp,
			COALESCE(SUM(expected_time), 0)   AS total_expected_time,
			COALESCE(SUM(time_spent), 0)      AS total_time_spent
		 FROM tasks WHERE iteration_id = ?`,
		iterationID,
	)
	return TaskAggregates{
		TotalFunctionPoints: row.TotalFunctionPoints,
		TotalExpectedTime:   row.TotalExpectedTime,
		TotalTimeSpent:      row.TotalTimeSpent,
	}, err
}

func (r *sqlxTaskRepository) Update(ctx context.Context, task *models.Task) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE tasks SET title = ?, description = ?, status = ?, tags = ?, function_points = ?,
		 expected_time = ?, time_spent = ?, assignee_id = ?, updated_at = ?
		 WHERE id = ?`,
		task.Title, task.Description, task.Status, task.Tags, task.FunctionPoints,
		task.ExpectedTime, task.TimeSpent, task.AssigneeID, task.UpdatedAt, task.ID,
	)
	return err
}

func (r *sqlxTaskRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM tasks WHERE id = ?`, id)
	return err
}
