import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { ProjectRef } from '@/services/requests/projects/types';
import { projectRoutes } from '@/services/routes/projects';
import type { ProjectMetrics } from './types';

export class ProjectMetricsRequest extends Request<ProjectRef, ProjectMetrics> {
  execute(input: ProjectRef, signal?: AbortSignal): Promise<ProjectMetrics> {
    return http<ProjectMetrics>(projectRoutes.metrics(input.projectId), { signal });
  }
}

export const projectMetricsRequest = new ProjectMetricsRequest();
