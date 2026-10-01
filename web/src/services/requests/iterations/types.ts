import type { ProjectRef } from '@/services/requests/projects/types';

export type IterationStatus = 'Planned' | 'Active' | 'Completed';

export interface Iteration {
  id: string;
  project_id: string;
  goal: string;
  start_at: string;
  end_at: string;
  status: IterationStatus;
  increment: number;
  created_at: string;
  updated_at: string;
}

export interface IterationRef extends ProjectRef {
  iterationId: string;
}

export interface CreateIterationPayload {
  goal: string;
  start_at: string;
  end_at: string;
  increment: number;
}

export interface UpdateIterationPayload extends CreateIterationPayload {
  status: IterationStatus;
}

export interface CreateIterationInput extends ProjectRef {
  payload: CreateIterationPayload;
}

export interface UpdateIterationInput extends IterationRef {
  payload: UpdateIterationPayload;
}
