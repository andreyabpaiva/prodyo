package models

import (
	"time"

	"github.com/google/uuid"
)

type Iteration struct {
	ID        uuid.UUID       `db:"id"`
	ProjectID uuid.UUID       `db:"project_id"`
	Goal      string          `db:"goal"`
	StartAt   time.Time       `db:"start_at"`
	EndAt     time.Time       `db:"end_at"`
	Status    IterationStatus `db:"status"`
	Increment int32           `db:"increment"`
	CreatedAt time.Time       `db:"created_at"`
	UpdatedAt time.Time       `db:"updated_at"`
}
