import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { CreateImprovementInput, Improvement } from './types';

export class CreateImprovementRequest extends Request<CreateImprovementInput, Improvement> {
  execute(input: CreateImprovementInput, signal?: AbortSignal): Promise<Improvement> {
    return http<Improvement>(taskRoutes.improvements(input.projectId, input.iterationId, input.taskId), {
      method: 'POST',
      body: input.payload,
      signal,
    });
  }
}

export const createImprovementRequest = new CreateImprovementRequest();
