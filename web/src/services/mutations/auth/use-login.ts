import { useMutation } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { loginRequest } from '@/services/requests/auth/login';
import type { AuthUser, LoginInput } from '@/services/requests/auth/types';

export function useLogin() {
  return useMutation<AuthUser, HttpError, LoginInput>({
    mutationFn: (input) => loginRequest.execute(input),
  });
}
