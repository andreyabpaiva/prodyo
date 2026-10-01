import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { createTaskRequest } from '@/services/requests/tasks/create';
import { updateTaskRequest } from '@/services/requests/tasks/update';
import type { CreateTaskCommand, Task } from '@/services/requests/tasks/types';
import { queryKeys } from '@/services/queries/keys';

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, HttpError, CreateTaskCommand>({
    mutationFn: async ({ status, ...input }) => {
      const task = await createTaskRequest.execute(input);
      if (task.status === status) return task;
      return updateTaskRequest.execute({
        projectId: input.projectId,
        iterationId: input.iterationId,
        taskId: task.id,
        payload: { ...input.payload, status, time_spent: task.time_spent },
      });
    },
    onSettled: (_data, _error, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectMetrics(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.iteration(input) });
    },
  });
}
