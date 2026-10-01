import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { Bug, UpdateBugInput } from './types';

export class UpdateBugRequest extends Request<UpdateBugInput, Bug> {
  execute(input: UpdateBugInput, signal?: AbortSignal): Promise<Bug> {
    return http<Bug>(taskRoutes.bug(input.projectId, input.iterationId, input.taskId, input.bugId), {
      method: 'PUT',
      body: input.payload,
      signal,
    });
  }
}

export const updateBugRequest = new UpdateBugRequest();
