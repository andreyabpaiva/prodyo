import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { ProjectRef } from '@/services/requests/projects/types';
import { projectRoutes } from '@/services/routes/projects';
import type { Member } from './types';

export class ListMembersRequest extends Request<ProjectRef, Member[]> {
  execute(input: ProjectRef, signal?: AbortSignal): Promise<Member[]> {
    return http<Member[]>(projectRoutes.members(input.projectId), { signal });
  }
}

export const listMembersRequest = new ListMembersRequest();
