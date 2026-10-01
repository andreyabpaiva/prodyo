import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { deleteTaskRequest } from '@/services/requests/tasks/delete';
import type { TaskRef } from '@/services/requests/tasks/types';
import { queryKeys } from '@/services/queries/keys';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, TaskRef>({
    mutationFn: (input) => deleteTaskRequest.execute(input),
    onSuccess: (_data, input) => {
      queryClient.removeQueries({ queryKey: queryKeys.task(input) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.iteration(input) });
    },
  });
}
