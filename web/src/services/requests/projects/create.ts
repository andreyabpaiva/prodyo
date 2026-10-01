import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { projectRoutes } from '@/services/routes/projects';
import type { CreateProjectInput, Project } from './types';

export class CreateProjectRequest extends Request<CreateProjectInput, Project> {
  execute(input: CreateProjectInput, signal?: AbortSignal): Promise<Project> {
    return http<Project>(projectRoutes.list(), {
      method: 'POST',
      body: input,
      signal,
    });
  }
}

export const createProjectRequest = new CreateProjectRequest();
