import { queryOptions, useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { listMembersRequest } from '@/services/requests/members/list';
import type { Member } from '@/services/requests/members/types';
import type { ProjectRef } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function membersQueryOptions(ref: ProjectRef) {
  return queryOptions<Member[], HttpError>({
    queryKey: queryKeys.members(ref),
    queryFn: ({ signal }) => listMembersRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId),
  });
}

export function useMembers(ref: ProjectRef) {
  return useQuery(membersQueryOptions(ref));
}
