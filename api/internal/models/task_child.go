package models

import (
	"time"

	"github.com/google/uuid"
)

type TaskChild struct {
	ID             uuid.UUID `db:"id" json:"id"`
	TaskID         uuid.UUID `db:"task_id" json:"task_id"`
	Description    string    `db:"description" json:"description"`
	FunctionPoints float64   `db:"function_points" json:"function_points"`
	LimitDate      time.Time `db:"limit_date" json:"limit_date"`
	CreatedAt      time.Time `db:"created_at" json:"created_at"`
	UpdatedAt      time.Time `db:"updated_at" json:"updated_at"`
}
