import type { QueryKey } from '@tanstack/react-query';
import type { ProjectRef } from '@/services/requests/projects/types';
import type { IterationRef } from '@/services/requests/iterations/types';
import type { TaskRef } from '@/services/requests/tasks/types';

export const queryKeys = {
  me: (): QueryKey => ['auth', 'me'],
  projects: (): QueryKey => ['projects'],
  project: ({ projectId }: ProjectRef): QueryKey => ['projects', projectId],
  members: (ref: ProjectRef): QueryKey => [...queryKeys.project(ref), 'members'],
  projectMetrics: (ref: ProjectRef): QueryKey => [...queryKeys.project(ref), 'metrics'],
  iterations: (ref: ProjectRef): QueryKey => [...queryKeys.project(ref), 'iterations'],
  iteration: (ref: IterationRef): QueryKey => [...queryKeys.iterations(ref), ref.iterationId],
  iterationMetrics: (ref: IterationRef): QueryKey => [...queryKeys.iteration(ref), 'metrics'],
  tasks: (ref: IterationRef): QueryKey => [...queryKeys.iteration(ref), 'tasks'],
  task: (ref: TaskRef): QueryKey => [...queryKeys.tasks(ref), ref.taskId],
  bugs: (ref: TaskRef): QueryKey => [...queryKeys.task(ref), 'bugs'],
  improvements: (ref: TaskRef): QueryKey => [...queryKeys.task(ref), 'improvements'],
};
