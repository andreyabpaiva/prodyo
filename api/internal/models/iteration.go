package models

import (
	"time"

	"github.com/google/uuid"
)

type Iteration struct {
	ID        uuid.UUID       `db:"id" json:"id"`
	ProjectID uuid.UUID       `db:"project_id" json:"project_id"`
	Goal      string          `db:"goal" json:"goal"`
	StartAt   time.Time       `db:"start_at" json:"start_at"`
	EndAt     time.Time       `db:"end_at" json:"end_at"`
	Status    IterationStatus `db:"status" json:"status"`
	Increment int32           `db:"increment" json:"increment"`
	CreatedAt time.Time       `db:"created_at" json:"created_at"`
	UpdatedAt time.Time       `db:"updated_at" json:"updated_at"`
}
