import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { iterationRoutes } from '@/services/routes/iterations';
import type { CreateIterationInput, Iteration } from './types';

export class CreateIterationRequest extends Request<CreateIterationInput, Iteration> {
  execute(input: CreateIterationInput, signal?: AbortSignal): Promise<Iteration> {
    return http<Iteration>(iterationRoutes.list(input.projectId), {
      method: 'POST',
      body: input.payload,
      signal,
    });
  }
}

export const createIterationRequest = new CreateIterationRequest();
