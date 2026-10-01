import { projectRoutes } from './projects';

export const iterationRoutes = {
  list: (projectId: string): string => `${projectRoutes.detail(projectId)}/iterations`,
  detail: (projectId: string, iterationId: string): string =>
    `${iterationRoutes.list(projectId)}/${iterationId}`,
  metrics: (projectId: string, iterationId: string): string =>
    `${iterationRoutes.detail(projectId, iterationId)}/metrics`,
};
