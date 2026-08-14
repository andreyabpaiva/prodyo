import { useMutation } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { registerRequest } from '@/services/requests/auth/register';
import type { AuthUser, RegisterInput } from '@/services/requests/auth/types';

export function useRegister() {
  return useMutation<AuthUser, HttpError, RegisterInput>({
    mutationFn: (input) => registerRequest.execute(input),
  });
}
