import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { IterationRef } from '@/services/requests/iterations/types';
import { taskRoutes } from '@/services/routes/tasks';
import type { Task } from './types';

export class ListTasksRequest extends Request<IterationRef, Task[]> {
  execute(input: IterationRef, signal?: AbortSignal): Promise<Task[]> {
    return http<Task[]>(taskRoutes.list(input.projectId, input.iterationId), { signal });
  }
}

export const listTasksRequest = new ListTasksRequest();
