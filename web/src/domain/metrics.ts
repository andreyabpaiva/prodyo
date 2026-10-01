import type { Task } from "@/services/requests/tasks/types";

export function sumFunctionPoints(tasks: Task[]): number {
  return tasks.reduce((sum, task) => sum + task.function_points, 0);
}

export function sumExpectedTime(tasks: Task[]): number {
  return tasks.reduce((sum, task) => sum + task.expected_time, 0);
}

export function sumTimeSpent(tasks: Task[]): number {
  return tasks.reduce((sum, task) => sum + task.time_spent, 0);
}

export function formatPercent(value: number | undefined): string {
  if (value === undefined) return "–";
  return `${Number(value.toFixed(1))}%`;
}
