import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { ProjectRef } from '@/services/requests/projects/types';
import { iterationRoutes } from '@/services/routes/iterations';
import type { Iteration } from './types';

export class ListIterationsRequest extends Request<ProjectRef, Iteration[]> {
  execute(input: ProjectRef, signal?: AbortSignal): Promise<Iteration[]> {
    return http<Iteration[]>(iterationRoutes.list(input.projectId), { signal });
  }
}

export const listIterationsRequest = new ListIterationsRequest();
