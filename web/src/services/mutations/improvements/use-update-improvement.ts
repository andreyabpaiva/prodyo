import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { updateImprovementRequest } from '@/services/requests/improvements/update';
import type { Improvement, UpdateImprovementInput } from '@/services/requests/improvements/types';
import { queryKeys } from '@/services/queries/keys';

export function useUpdateImprovement() {
  const queryClient = useQueryClient();
  return useMutation<Improvement, HttpError, UpdateImprovementInput>({
    mutationFn: (input) => updateImprovementRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.iterationMetrics(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.improvements(input) });
    },
  });
}
