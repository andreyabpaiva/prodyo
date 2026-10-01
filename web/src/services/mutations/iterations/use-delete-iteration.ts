import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { deleteIterationRequest } from '@/services/requests/iterations/delete';
import type { IterationRef } from '@/services/requests/iterations/types';
import { queryKeys } from '@/services/queries/keys';

export function useDeleteIteration() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, IterationRef>({
    mutationFn: (input) => deleteIterationRequest.execute(input),
    onSuccess: (_data, input) => {
      queryClient.removeQueries({ queryKey: queryKeys.iteration(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.project(input) });
    },
  });
}
