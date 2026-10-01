import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { iterationRoutes } from '@/services/routes/iterations';
import type { IterationRef } from './types';

export class DeleteIterationRequest extends Request<IterationRef, void> {
  execute(input: IterationRef, signal?: AbortSignal): Promise<void> {
    return http<void>(iterationRoutes.detail(input.projectId, input.iterationId), {
      method: 'DELETE',
      signal,
    });
  }
}

export const deleteIterationRequest = new DeleteIterationRequest();
