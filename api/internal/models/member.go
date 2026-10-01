package models

import (
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/google/uuid"
)

type Member struct {
	ID        uuid.UUID             `db:"id" json:"id"`
	UserID    uuid.UUID             `db:"user_id" json:"user_id"`
	ProjectID uuid.UUID             `db:"project_id" json:"project_id"`
	Roles     utils.RoleSlice[Role] `db:"roles" json:"roles"`
	CreatedAt time.Time             `db:"created_at" json:"created_at"`
}

type MemberWithUser struct {
	Member
	Name  string `db:"name" json:"name"`
	Email string `db:"email" json:"email"`
}
