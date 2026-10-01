import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { listTasksRequest } from '@/services/requests/tasks/list';
import type { Task } from '@/services/requests/tasks/types';
import type { IterationRef } from '@/services/requests/iterations/types';
import { queryKeys } from '@/services/queries/keys';

export function useTasks(ref: IterationRef) {
  return useQuery<Task[], HttpError>({
    queryKey: queryKeys.tasks(ref),
    queryFn: ({ signal }) => listTasksRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId && ref.iterationId),
  });
}
