package models

import (
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/google/uuid"
)

type Task struct {
	ID             uuid.UUID         `db:"id" json:"id"`
	IterationID    uuid.UUID         `db:"iteration_id" json:"iteration_id"`
	Title          string            `db:"title" json:"title"`
	Description    string            `db:"description" json:"description"`
	Status         TaskStatus        `db:"status" json:"status"`
	Tags           utils.StringSlice `db:"tags" json:"tags"`
	FunctionPoints float64           `db:"function_points" json:"function_points"`
	ExpectedTime   utils.Seconds     `db:"expected_time" json:"expected_time"`
	TimeSpent      utils.Seconds     `db:"time_spent" json:"time_spent"`
	AssigneeID     *uuid.UUID        `db:"assignee_id" json:"assignee_id"`
	CreatedAt      time.Time         `db:"created_at" json:"created_at"`
	UpdatedAt      time.Time         `db:"updated_at" json:"updated_at"`
}
