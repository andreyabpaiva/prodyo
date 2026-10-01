import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { TaskRef } from '@/services/requests/tasks/types';
import { taskRoutes } from '@/services/routes/tasks';
import type { Improvement } from './types';

export class ListImprovementsRequest extends Request<TaskRef, Improvement[]> {
  execute(input: TaskRef, signal?: AbortSignal): Promise<Improvement[]> {
    return http<Improvement[]>(taskRoutes.improvements(input.projectId, input.iterationId, input.taskId), { signal });
  }
}

export const listImprovementsRequest = new ListImprovementsRequest();
