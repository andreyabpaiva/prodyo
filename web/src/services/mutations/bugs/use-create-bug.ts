import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { createBugRequest } from '@/services/requests/bugs/create';
import type { Bug, CreateBugInput } from '@/services/requests/bugs/types';
import { queryKeys } from '@/services/queries/keys';

export function useCreateBug() {
  const queryClient = useQueryClient();
  return useMutation<Bug, HttpError, CreateBugInput>({
    mutationFn: (input) => createBugRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.iterationMetrics(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.bugs(input) });
    },
  });
}
