import { iterationRoutes } from './iterations';

export const taskRoutes = {
  list: (projectId: string, iterationId: string): string =>
    `${iterationRoutes.detail(projectId, iterationId)}/tasks`,
  detail: (projectId: string, iterationId: string, taskId: string): string =>
    `${taskRoutes.list(projectId, iterationId)}/${taskId}`,
  bugs: (projectId: string, iterationId: string, taskId: string): string =>
    `${taskRoutes.detail(projectId, iterationId, taskId)}/bugs`,
  bug: (projectId: string, iterationId: string, taskId: string, bugId: string): string =>
    `${taskRoutes.bugs(projectId, iterationId, taskId)}/${bugId}`,
  improvements: (projectId: string, iterationId: string, taskId: string): string =>
    `${taskRoutes.detail(projectId, iterationId, taskId)}/improvements`,
  improvement: (
    projectId: string,
    iterationId: string,
    taskId: string,
    improvementId: string,
  ): string => `${taskRoutes.improvements(projectId, iterationId, taskId)}/${improvementId}`,
};
