package models

type TaskStatus string

const (
	TaskStatusBacklog    TaskStatus = "Backlog"
	TaskStatusTodo       TaskStatus = "Todo"
	TaskStatusInProgress TaskStatus = "InProgress"
	TaskStatusReview     TaskStatus = "Review"
	TaskStatusDone       TaskStatus = "Done"
)
