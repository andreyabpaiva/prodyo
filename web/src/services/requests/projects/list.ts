import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { projectRoutes } from '@/services/routes/projects';
import type { Project } from './types';

export class ListProjectsRequest extends Request<void, Project[]> {
  execute(_input: void, signal?: AbortSignal): Promise<Project[]> {
    return http<Project[]>(projectRoutes.list(), { signal });
  }
}

export const listProjectsRequest = new ListProjectsRequest();
