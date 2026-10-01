import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { Task, UpdateTaskInput } from './types';

export class UpdateTaskRequest extends Request<UpdateTaskInput, Task> {
  execute(input: UpdateTaskInput, signal?: AbortSignal): Promise<Task> {
    return http<Task>(taskRoutes.detail(input.projectId, input.iterationId, input.taskId), {
      method: 'PUT',
      body: input.payload,
      signal,
    });
  }
}

export const updateTaskRequest = new UpdateTaskRequest();
