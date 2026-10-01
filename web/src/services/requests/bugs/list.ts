import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { TaskRef } from '@/services/requests/tasks/types';
import { taskRoutes } from '@/services/routes/tasks';
import type { Bug } from './types';

export class ListBugsRequest extends Request<TaskRef, Bug[]> {
  execute(input: TaskRef, signal?: AbortSignal): Promise<Bug[]> {
    return http<Bug[]>(taskRoutes.bugs(input.projectId, input.iterationId, input.taskId), { signal });
  }
}

export const listBugsRequest = new ListBugsRequest();
