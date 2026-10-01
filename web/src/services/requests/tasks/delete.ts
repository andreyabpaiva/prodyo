import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { TaskRef } from './types';

export class DeleteTaskRequest extends Request<TaskRef, void> {
  execute(input: TaskRef, signal?: AbortSignal): Promise<void> {
    return http<void>(taskRoutes.detail(input.projectId, input.iterationId, input.taskId), {
      method: 'DELETE',
      signal,
    });
  }
}

export const deleteTaskRequest = new DeleteTaskRequest();
