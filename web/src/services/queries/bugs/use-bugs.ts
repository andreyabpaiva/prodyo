import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { listBugsRequest } from '@/services/requests/bugs/list';
import type { Bug } from '@/services/requests/bugs/types';
import type { TaskRef } from '@/services/requests/tasks/types';
import { queryKeys } from '@/services/queries/keys';

export function useBugs(ref: TaskRef) {
  return useQuery<Bug[], HttpError>({
    queryKey: queryKeys.bugs(ref),
    queryFn: ({ signal }) => listBugsRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId && ref.iterationId && ref.taskId),
  });
}
