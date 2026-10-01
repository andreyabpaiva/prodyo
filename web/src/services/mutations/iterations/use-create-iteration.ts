import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { createIterationRequest } from '@/services/requests/iterations/create';
import type { CreateIterationInput, Iteration } from '@/services/requests/iterations/types';
import { queryKeys } from '@/services/queries/keys';

export function useCreateIteration() {
  const queryClient = useQueryClient();
  return useMutation<Iteration, HttpError, CreateIterationInput>({
    mutationFn: (input) => createIterationRequest.execute(input),
    onSuccess: (_data, input) => queryClient.invalidateQueries({ queryKey: queryKeys.project(input) }),
  });
}
