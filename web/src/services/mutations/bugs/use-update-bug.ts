import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { updateBugRequest } from '@/services/requests/bugs/update';
import type { Bug, UpdateBugInput } from '@/services/requests/bugs/types';
import { queryKeys } from '@/services/queries/keys';

export function useUpdateBug() {
  const queryClient = useQueryClient();
  return useMutation<Bug, HttpError, UpdateBugInput>({
    mutationFn: (input) => updateBugRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.iterationMetrics(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.bugs(input) });
    },
  });
}
