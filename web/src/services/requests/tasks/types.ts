import type { IterationRef } from '@/services/requests/iterations/types';

export type TaskStatus = 'Backlog' | 'Todo' | 'InProgress' | 'Review' | 'Done';

export interface Task {
  id: string;
  iteration_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tags: string[];
  function_points: number;
  expected_time: number;
  time_spent: number;
  assignee_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskRef extends IterationRef {
  taskId: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  tags: string[];
  function_points: number;
  expected_time: number;
  assignee_id: string | null;
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  status: TaskStatus;
  time_spent: number;
}

export interface CreateTaskInput extends IterationRef {
  payload: CreateTaskPayload;
}

export interface UpdateTaskInput extends TaskRef {
  payload: UpdateTaskPayload;
}

export interface CreateTaskCommand extends CreateTaskInput {
  status: TaskStatus;
}
