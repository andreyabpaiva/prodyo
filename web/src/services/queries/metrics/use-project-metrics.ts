import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { projectMetricsRequest } from '@/services/requests/metrics/project';
import type { ProjectMetrics } from '@/services/requests/metrics/types';
import type { ProjectRef } from '@/services/requests/projects/types';
import { queryKeys } from '@/services/queries/keys';

export function useProjectMetrics(ref: ProjectRef) {
  return useQuery<ProjectMetrics, HttpError>({
    queryKey: queryKeys.projectMetrics(ref),
    queryFn: ({ signal }) => projectMetricsRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId),
  });
}
