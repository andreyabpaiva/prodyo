package iterrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxIterationRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) IterationRepository {
	return &sqlxIterationRepository{db: db}
}

func (r *sqlxIterationRepository) Create(ctx context.Context, iteration *models.Iteration) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO iterations (id, project_id, goal, start_at, end_at, status, increment, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		iteration.ID, iteration.ProjectID, iteration.Goal, iteration.StartAt, iteration.EndAt,
		iteration.Status, iteration.Increment, iteration.CreatedAt, iteration.UpdatedAt,
	)
	return err
}

func (r *sqlxIterationRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.Iteration, error) {
	var iteration models.Iteration
	if err := r.db.GetContext(ctx, &iteration, `SELECT * FROM iterations WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &iteration, nil
}

func (r *sqlxIterationRepository) FindByProjectID(ctx context.Context, projectID uuid.UUID) ([]models.Iteration, error) {
	var iterations []models.Iteration
	err := r.db.SelectContext(ctx, &iterations,
		`SELECT * FROM iterations WHERE project_id = ? ORDER BY increment ASC`, projectID,
	)
	return iterations, err
}

func (r *sqlxIterationRepository) Update(ctx context.Context, iteration *models.Iteration) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE iterations SET goal = ?, start_at = ?, end_at = ?, status = ?, increment = ?, updated_at = ?
		 WHERE id = ?`,
		iteration.Goal, iteration.StartAt, iteration.EndAt, iteration.Status,
		iteration.Increment, iteration.UpdatedAt, iteration.ID,
	)
	return err
}

func (r *sqlxIterationRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM iterations WHERE id = ?`, id)
	return err
}
