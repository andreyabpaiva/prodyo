import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { Improvement, UpdateImprovementInput } from './types';

export class UpdateImprovementRequest extends Request<UpdateImprovementInput, Improvement> {
  execute(input: UpdateImprovementInput, signal?: AbortSignal): Promise<Improvement> {
    return http<Improvement>(taskRoutes.improvement(input.projectId, input.iterationId, input.taskId, input.improvementId), {
      method: 'PUT',
      body: input.payload,
      signal,
    });
  }
}

export const updateImprovementRequest = new UpdateImprovementRequest();
