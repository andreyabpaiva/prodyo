import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { loginRequest } from '@/services/requests/auth/login';
import type { AuthUser, LoginInput } from '@/services/requests/auth/types';
import { queryKeys } from '@/services/queries/keys';

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation<AuthUser, HttpError, LoginInput>({
    mutationFn: (input) => loginRequest.execute(input),
    onSuccess: (user) => queryClient.setQueryData(queryKeys.me(), user),
  });
}
