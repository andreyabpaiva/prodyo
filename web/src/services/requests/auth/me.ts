import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { authRoutes } from '@/services/routes/auth';
import type { AuthUser } from './types';

export class MeRequest extends Request<void, AuthUser> {
  execute(_input: void, signal?: AbortSignal): Promise<AuthUser> {
    return http<AuthUser>(authRoutes.me(), { signal });
  }
}

export const meRequest = new MeRequest();
