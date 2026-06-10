package memberrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxMemberRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) MemberRepository {
	return &sqlxMemberRepository{db: db}
}

func (r *sqlxMemberRepository) Create(ctx context.Context, member *models.Member) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO members (id, user_id, project_id, roles, created_at)
		 VALUES (?, ?, ?, ?, ?)`,
		member.ID, member.UserID, member.ProjectID, member.Roles, member.CreatedAt,
	)
	return err
}

func (r *sqlxMemberRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.Member, error) {
	var member models.Member
	if err := r.db.GetContext(ctx, &member, `SELECT * FROM members WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &member, nil
}

func (r *sqlxMemberRepository) FindByProjectID(ctx context.Context, projectID uuid.UUID) ([]models.Member, error) {
	var members []models.Member
	err := r.db.SelectContext(ctx, &members, `SELECT * FROM members WHERE project_id = ?`, projectID)
	return members, err
}

func (r *sqlxMemberRepository) FindByUserAndProject(ctx context.Context, userID, projectID uuid.UUID) (*models.Member, error) {
	var member models.Member
	if err := r.db.GetContext(ctx, &member,
		`SELECT * FROM members WHERE user_id = ? AND project_id = ?`, userID, projectID,
	); err != nil {
		return nil, err
	}
	return &member, nil
}

func (r *sqlxMemberRepository) Update(ctx context.Context, member *models.Member) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE members SET roles = ? WHERE id = ?`,
		member.Roles, member.ID,
	)
	return err
}

func (r *sqlxMemberRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM members WHERE id = ?`, id)
	return err
}
