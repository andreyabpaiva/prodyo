package models

import (
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/google/uuid"
)

type Project struct {
	ID          uuid.UUID        `db:"id"`
	Name        string           `db:"name"`
	Description string           `db:"description"`
	Tags        utils.StringSlice `db:"tags"`
	CreatedAt   time.Time        `db:"created_at"`
	UpdatedAt   time.Time        `db:"updated_at"`
}
