export const authRoutes = {
  login: (): string => '/api/auth/login',
  register: (): string => '/api/auth/register',
  logout: (): string => '/api/auth/logout',
  me: (): string => '/api/auth/me',
};
