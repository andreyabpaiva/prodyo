export const projectRoutes = {
  list: (): string => '/api/projects',
  detail: (projectId: string): string => `/api/projects/${projectId}`,
  members: (projectId: string): string => `/api/projects/${projectId}/members`,
  metrics: (projectId: string): string => `/api/projects/${projectId}/metrics`,
};
