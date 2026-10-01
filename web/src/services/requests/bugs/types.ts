import type { TaskRef } from '@/services/requests/tasks/types';

export interface Bug {
  id: string;
  task_id: string;
  description: string;
  function_points: number;
  limit_date: string;
  created_at: string;
  updated_at: string;
}

export interface BugRef extends TaskRef {
  bugId: string;
}

export interface BugPayload {
  description: string;
  function_points: number;
  limit_date: string;
}

export interface CreateBugInput extends TaskRef {
  payload: BugPayload;
}

export interface UpdateBugInput extends BugRef {
  payload: BugPayload;
}
