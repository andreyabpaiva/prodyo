import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { authRoutes } from '@/services/routes/auth';

export class LogoutRequest extends Request<void, void> {
  execute(_input: void, signal?: AbortSignal): Promise<void> {
    return http<void>(authRoutes.logout(), {
      method: 'POST',
      signal,
    });
  }
}

export const logoutRequest = new LogoutRequest();
