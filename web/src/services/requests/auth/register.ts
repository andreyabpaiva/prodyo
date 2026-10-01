import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import { authRoutes } from '@/services/routes/auth';
import type { AuthUser, RegisterInput } from './types';

export class RegisterRequest extends Request<RegisterInput, AuthUser> {
  execute(input: RegisterInput, signal?: AbortSignal): Promise<AuthUser> {
    return http<AuthUser>(authRoutes.register(), {
      method: 'POST',
      body: input,
      signal,
    });
  }
}

export const registerRequest = new RegisterRequest();
