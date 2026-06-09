package models

import (
	"time"

	"github.com/google/uuid"
)

type TaskChild struct {
	ID             uuid.UUID `db:"id"`
	TaskID         uuid.UUID `db:"task_id"`
	Description    string    `db:"description"`
	FunctionPoints float64   `db:"function_points"`
	LimitDate      time.Time `db:"limit_date"`
	CreatedAt      time.Time `db:"created_at"`
	UpdatedAt      time.Time `db:"updated_at"`
}
