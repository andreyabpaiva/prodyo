import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { deleteBugRequest } from '@/services/requests/bugs/delete';
import type { BugRef } from '@/services/requests/bugs/types';
import { queryKeys } from '@/services/queries/keys';

export function useDeleteBug() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, BugRef>({
    mutationFn: (input) => deleteBugRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.iterationMetrics(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.bugs(input) });
    },
  });
}
