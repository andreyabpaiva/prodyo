import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { projectRoutes } from '@/services/routes/projects';
import type { Project, ProjectRef } from './types';

export class GetProjectRequest extends Request<ProjectRef, Project> {
  execute(input: ProjectRef, signal?: AbortSignal): Promise<Project> {
    return http<Project>(projectRoutes.detail(input.projectId), { signal });
  }
}

export const getProjectRequest = new GetProjectRequest();
