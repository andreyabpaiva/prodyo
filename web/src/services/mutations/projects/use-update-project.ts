import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { updateProjectRequest } from '@/services/requests/projects/update';
import type { Project, UpdateProjectInput } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation<Project, HttpError, UpdateProjectInput>({
    mutationFn: (input) => updateProjectRequest.execute(input),
    onSuccess: (project, input) => {
      queryClient.setQueryData(queryKeys.project(input), project);
      return queryClient.invalidateQueries({ queryKey: queryKeys.projects(), exact: true });
    },
  });
}
