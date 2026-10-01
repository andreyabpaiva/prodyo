import type { TaskRef } from '@/services/requests/tasks/types';

export interface Improvement {
  id: string;
  task_id: string;
  description: string;
  function_points: number;
  limit_date: string;
  created_at: string;
  updated_at: string;
}

export interface ImprovementRef extends TaskRef {
  improvementId: string;
}

export interface ImprovementPayload {
  description: string;
  function_points: number;
  limit_date: string;
}

export interface CreateImprovementInput extends TaskRef {
  payload: ImprovementPayload;
}

export interface UpdateImprovementInput extends ImprovementRef {
  payload: ImprovementPayload;
}
