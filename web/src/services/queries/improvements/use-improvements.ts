import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { listImprovementsRequest } from '@/services/requests/improvements/list';
import type { Improvement } from '@/services/requests/improvements/types';
import type { TaskRef } from '@/services/requests/tasks/types';
import { queryKeys } from '@/services/queries/keys';

export function useImprovements(ref: TaskRef) {
  return useQuery<Improvement[], HttpError>({
    queryKey: queryKeys.improvements(ref),
    queryFn: ({ signal }) => listImprovementsRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId && ref.iterationId && ref.taskId),
  });
}
