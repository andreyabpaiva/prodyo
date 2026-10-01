import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { createProjectRequest } from '@/services/requests/projects/create';
import type { CreateProjectInput, Project } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation<Project, HttpError, CreateProjectInput>({
    mutationFn: (input) => createProjectRequest.execute(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.projects() }),
  });
}
