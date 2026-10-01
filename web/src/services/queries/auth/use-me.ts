import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { meRequest } from '@/services/requests/auth/me';
import type { AuthUser } from '@/services/requests/auth/types';
import { queryKeys } from '@/services/queries/keys';

export function useMe() {
  return useQuery<AuthUser, HttpError>({
    queryKey: queryKeys.me(),
    queryFn: ({ signal }) => meRequest.execute(undefined, signal),
    retry: false,
  });
}
