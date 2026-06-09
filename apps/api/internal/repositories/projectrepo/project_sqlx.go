package projectrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxProjectRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) ProjectRepository {
	return &sqlxProjectRepository{db: db}
}

func (r *sqlxProjectRepository) Create(ctx context.Context, project *models.Project) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO projects (id, name, description, tags, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?)`,
		project.ID, project.Name, project.Description, project.Tags, project.CreatedAt, project.UpdatedAt,
	)
	return err
}

func (r *sqlxProjectRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.Project, error) {
	var project models.Project
	if err := r.db.GetContext(ctx, &project, `SELECT * FROM projects WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *sqlxProjectRepository) FindByUserID(ctx context.Context, userID uuid.UUID) ([]models.Project, error) {
	var projects []models.Project
	err := r.db.SelectContext(ctx, &projects,
		`SELECT p.* FROM projects p
		 INNER JOIN members m ON m.project_id = p.id
		 WHERE m.user_id = ?`,
		userID,
	)
	return projects, err
}

func (r *sqlxProjectRepository) Update(ctx context.Context, project *models.Project) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE projects SET name = ?, description = ?, tags = ?, updated_at = ? WHERE id = ?`,
		project.Name, project.Description, project.Tags, project.UpdatedAt, project.ID,
	)
	return err
}

func (r *sqlxProjectRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM projects WHERE id = ?`, id)
	return err
}
