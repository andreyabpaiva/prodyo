import { queryOptions, useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { listIterationsRequest } from '@/services/requests/iterations/list';
import type { Iteration } from '@/services/requests/iterations/types';
import type { ProjectRef } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function iterationsQueryOptions(ref: ProjectRef) {
  return queryOptions<Iteration[], HttpError>({
    queryKey: queryKeys.iterations(ref),
    queryFn: ({ signal }) => listIterationsRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId),
  });
}

export function useIterations(ref: ProjectRef) {
  return useQuery(iterationsQueryOptions(ref));
}
