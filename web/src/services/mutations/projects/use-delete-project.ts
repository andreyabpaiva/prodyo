import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { deleteProjectRequest } from '@/services/requests/projects/delete';
import type { ProjectRef } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, ProjectRef>({
    mutationFn: (input) => deleteProjectRequest.execute(input),
    onSuccess: (_data, input) => {
      queryClient.removeQueries({ queryKey: queryKeys.project(input) });
      return queryClient.invalidateQueries({ queryKey: queryKeys.projects(), exact: true });
    },
  });
}
