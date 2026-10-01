import type { IterationStatus } from "@/services/requests/iterations/types";
import type { TaskStatus } from "@/services/requests/tasks/types";

export type StatusTone = "neutral" | "todo" | "doing" | "impro" | "done";

export const TASK_STATUSES: TaskStatus[] = [
  "Backlog",
  "Todo",
  "InProgress",
  "Review",
  "Done",
];

export const ITERATION_STATUSES: IterationStatus[] = [
  "Planned",
  "Active",
  "Completed",
];

export const TASK_STATUS_TONE: Record<TaskStatus, StatusTone> = {
  Backlog: "neutral",
  Todo: "todo",
  InProgress: "doing",
  Review: "impro",
  Done: "done",
};

export const ITERATION_STATUS_TONE: Record<IterationStatus, StatusTone> = {
  Planned: "todo",
  Active: "doing",
  Completed: "done",
};

export const TASK_STATUS_LABEL_KEY: Record<TaskStatus, string> = {
  Backlog: "taskStatus.Backlog",
  Todo: "taskStatus.Todo",
  InProgress: "taskStatus.InProgress",
  Review: "taskStatus.Review",
  Done: "taskStatus.Done",
};

export const ITERATION_STATUS_LABEL_KEY: Record<IterationStatus, string> = {
  Planned: "iterationStatus.Planned",
  Active: "iterationStatus.Active",
  Completed: "iterationStatus.Completed",
};

export const STATUS_SURFACE: Record<StatusTone, string> = {
  neutral: "bg-shell text-dust",
  todo: "bg-status-todo text-status-todo-dot",
  doing: "bg-status-doing text-status-doing-dot",
  impro: "bg-impro-bg text-impro",
  done: "bg-status-done text-status-done-dot",
};
