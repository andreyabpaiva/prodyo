import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { registerRequest } from '@/services/requests/auth/register';
import type { AuthUser, RegisterInput } from '@/services/requests/auth/types';
import { queryKeys } from '@/services/queries/keys';

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation<AuthUser, HttpError, RegisterInput>({
    mutationFn: (input) => registerRequest.execute(input),
    onSuccess: (user) => queryClient.setQueryData(queryKeys.me(), user),
  });
}
