import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { logoutRequest } from '@/services/requests/auth/logout';

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, void>({
    mutationFn: () => logoutRequest.execute(),
    onSuccess: () => queryClient.clear(),
  });
}
