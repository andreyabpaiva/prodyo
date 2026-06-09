package models

type IterationStatus string

const (
	IterationStatusPlanned   IterationStatus = "Planned"
	IterationStatusActive    IterationStatus = "Active"
	IterationStatusCompleted IterationStatus = "Completed"
)
