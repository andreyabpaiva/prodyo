import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { CreateTaskInput, Task } from './types';

export class CreateTaskRequest extends Request<CreateTaskInput, Task> {
  execute(input: CreateTaskInput, signal?: AbortSignal): Promise<Task> {
    return http<Task>(taskRoutes.list(input.projectId, input.iterationId), {
      method: 'POST',
      body: input.payload,
      signal,
    });
  }
}

export const createTaskRequest = new CreateTaskRequest();
