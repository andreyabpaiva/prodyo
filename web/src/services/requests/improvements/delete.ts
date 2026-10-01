import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { ImprovementRef } from './types';

export class DeleteImprovementRequest extends Request<ImprovementRef, void> {
  execute(input: ImprovementRef, signal?: AbortSignal): Promise<void> {
    return http<void>(taskRoutes.improvement(input.projectId, input.iterationId, input.taskId, input.improvementId), {
      method: 'DELETE',
      signal,
    });
  }
}

export const deleteImprovementRequest = new DeleteImprovementRequest();
