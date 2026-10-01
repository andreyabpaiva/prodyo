package models

import (
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/google/uuid"
)

type Project struct {
	ID          uuid.UUID         `db:"id" json:"id"`
	Name        string            `db:"name" json:"name"`
	Description string            `db:"description" json:"description"`
	Tags        utils.StringSlice `db:"tags" json:"tags"`
	CreatedAt   time.Time         `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time         `db:"updated_at" json:"updated_at"`
}
