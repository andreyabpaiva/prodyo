package models

import (
	"time"

	"github.com/andreyapaiva/prodyo/apps/api/internal/models/utils"
	"github.com/google/uuid"
)

type Task struct {
	ID             uuid.UUID         `db:"id"`
	IterationID    uuid.UUID         `db:"iteration_id"`
	Title          string            `db:"title"`
	Description    string            `db:"description"`
	Status         TaskStatus        `db:"status"`
	Tags           utils.StringSlice `db:"tags"`
	FunctionPoints float64           `db:"function_points"`
	ExpectedTime   utils.Seconds     `db:"expected_time"`
	TimeSpent      utils.Seconds     `db:"time_spent"`
	AssigneeID     *uuid.UUID        `db:"assignee_id"`
	CreatedAt      time.Time         `db:"created_at"`
	UpdatedAt      time.Time         `db:"updated_at"`
}
