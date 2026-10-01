import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { projectRoutes } from '@/services/routes/projects';
import type { Project, UpdateProjectInput } from './types';

export class UpdateProjectRequest extends Request<UpdateProjectInput, Project> {
  execute(input: UpdateProjectInput, signal?: AbortSignal): Promise<Project> {
    return http<Project>(projectRoutes.detail(input.projectId), {
      method: 'PUT',
      body: input.payload,
      signal,
    });
  }
}

export const updateProjectRequest = new UpdateProjectRequest();
