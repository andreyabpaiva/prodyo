import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { updateIterationRequest } from '@/services/requests/iterations/update';
import type { Iteration, UpdateIterationInput } from '@/services/requests/iterations/types';
import { queryKeys } from '@/services/queries/keys';

export function useUpdateIteration() {
  const queryClient = useQueryClient();
  return useMutation<Iteration, HttpError, UpdateIterationInput>({
    mutationFn: (input) => updateIterationRequest.execute(input),
    onSuccess: (_data, input) => queryClient.invalidateQueries({ queryKey: queryKeys.iterations(input) }),
  });
}
