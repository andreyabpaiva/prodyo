import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { listProjectsRequest } from '@/services/requests/projects/list';
import type { Project } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function useProjects() {
  return useQuery<Project[], HttpError>({
    queryKey: queryKeys.projects(),
    queryFn: ({ signal }) => listProjectsRequest.execute(undefined, signal),
  });
}
