package models

import (
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/google/uuid"
)

type Member struct {
	ID        uuid.UUID            `db:"id"`
	UserID    uuid.UUID            `db:"user_id"`
	ProjectID uuid.UUID            `db:"project_id"`
	Roles     utils.RoleSlice[Role] `db:"roles"`
	CreatedAt time.Time            `db:"created_at"`
}
