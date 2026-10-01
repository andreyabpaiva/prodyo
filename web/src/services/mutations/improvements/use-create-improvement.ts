import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { createImprovementRequest } from '@/services/requests/improvements/create';
import type { Improvement, CreateImprovementInput } from '@/services/requests/improvements/types';
import { queryKeys } from '@/services/queries/keys';

export function useCreateImprovement() {
  const queryClient = useQueryClient();
  return useMutation<Improvement, HttpError, CreateImprovementInput>({
    mutationFn: (input) => createImprovementRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.iterationMetrics(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.improvements(input) });
    },
  });
}
