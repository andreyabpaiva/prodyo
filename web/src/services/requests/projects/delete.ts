import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { projectRoutes } from '@/services/routes/projects';
import type { ProjectRef } from './types';

export class DeleteProjectRequest extends Request<ProjectRef, void> {
  execute(input: ProjectRef, signal?: AbortSignal): Promise<void> {
    return http<void>(projectRoutes.detail(input.projectId), {
      method: 'DELETE',
      signal,
    });
  }
}

export const deleteProjectRequest = new DeleteProjectRequest();
