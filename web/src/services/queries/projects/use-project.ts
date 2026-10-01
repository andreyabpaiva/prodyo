import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { getProjectRequest } from '@/services/requests/projects/get';
import type { Project, ProjectRef } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function useProject(ref: ProjectRef) {
  return useQuery<Project, HttpError>({
    queryKey: queryKeys.project(ref),
    queryFn: ({ signal }) => getProjectRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId),
  });
}
