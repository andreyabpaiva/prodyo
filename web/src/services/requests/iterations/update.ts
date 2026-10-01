import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { iterationRoutes } from '@/services/routes/iterations';
import type { Iteration, UpdateIterationInput } from './types';

export class UpdateIterationRequest extends Request<UpdateIterationInput, Iteration> {
  execute(input: UpdateIterationInput, signal?: AbortSignal): Promise<Iteration> {
    return http<Iteration>(iterationRoutes.detail(input.projectId, input.iterationId), {
      method: 'PUT',
      body: input.payload,
      signal,
    });
  }
}

export const updateIterationRequest = new UpdateIterationRequest();
