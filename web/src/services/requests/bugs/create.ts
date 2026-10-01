import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { Bug, CreateBugInput } from './types';

export class CreateBugRequest extends Request<CreateBugInput, Bug> {
  execute(input: CreateBugInput, signal?: AbortSignal): Promise<Bug> {
    return http<Bug>(taskRoutes.bugs(input.projectId, input.iterationId, input.taskId), {
      method: 'POST',
      body: input.payload,
      signal,
    });
  }
}

export const createBugRequest = new CreateBugRequest();
