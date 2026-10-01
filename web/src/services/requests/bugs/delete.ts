import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { taskRoutes } from '@/services/routes/tasks';
import type { BugRef } from './types';

export class DeleteBugRequest extends Request<BugRef, void> {
  execute(input: BugRef, signal?: AbortSignal): Promise<void> {
    return http<void>(taskRoutes.bug(input.projectId, input.iterationId, input.taskId, input.bugId), {
      method: 'DELETE',
      signal,
    });
  }
}

export const deleteBugRequest = new DeleteBugRequest();
