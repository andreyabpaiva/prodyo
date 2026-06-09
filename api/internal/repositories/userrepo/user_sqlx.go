package userrepo

import (
	"context"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type sqlxUserRepository struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) UserRepository {
	return &sqlxUserRepository{db: db}
}

func (r *sqlxUserRepository) Create(ctx context.Context, user *models.User) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO users (id, name, email, password_hash, created_at, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?)`,
		user.ID, user.Name, user.Email, user.PasswordHash, user.CreatedAt, user.UpdatedAt,
	)
	return err
}

func (r *sqlxUserRepository) FindByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	var user models.User
	if err := r.db.GetContext(ctx, &user, `SELECT * FROM users WHERE id = ?`, id); err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *sqlxUserRepository) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	if err := r.db.GetContext(ctx, &user, `SELECT * FROM users WHERE email = ?`, email); err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *sqlxUserRepository) Update(ctx context.Context, user *models.User) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE users SET name = ?, email = ?, password_hash = ?, updated_at = ? WHERE id = ?`,
		user.Name, user.Email, user.PasswordHash, user.UpdatedAt, user.ID,
	)
	return err
}

func (r *sqlxUserRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM users WHERE id = ?`, id)
	return err
}
