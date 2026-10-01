import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { deleteImprovementRequest } from '@/services/requests/improvements/delete';
import type { ImprovementRef } from '@/services/requests/improvements/types';
import { queryKeys } from '@/services/queries/keys';

export function useDeleteImprovement() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, ImprovementRef>({
    mutationFn: (input) => deleteImprovementRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.iterationMetrics(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.improvements(input) });
    },
  });
}
