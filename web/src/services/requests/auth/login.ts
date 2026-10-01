import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { authRoutes } from '@/services/routes/auth';
import type { AuthUser, LoginInput } from './types';

export class LoginRequest extends Request<LoginInput, AuthUser> {
  execute(input: LoginInput, signal?: AbortSignal): Promise<AuthUser> {
    return http<AuthUser>(authRoutes.login(), {
      method: 'POST',
      body: input,
      signal,
    });
  }
}

export const loginRequest = new LoginRequest();
