import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { updateTaskRequest } from '@/services/requests/tasks/update';
import type { Task, UpdateTaskInput } from '@/services/requests/tasks/types';
import { queryKeys } from '@/services/queries/keys';

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, HttpError, UpdateTaskInput>({
    mutationFn: (input) => updateTaskRequest.execute(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.iteration(input) });
    },
  });
}
