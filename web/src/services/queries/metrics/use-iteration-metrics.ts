import { useQuery } from '@tanstack/react-query';
import type { HttpError } from '@/lib/http';
import { iterationMetricsRequest } from '@/services/requests/metrics/iteration';
import type { IterationMetrics } from '@/services/requests/metrics/types';
import type { IterationRef } from '@/services/requests/iterations/types';
import { queryKeys } from '@/services/queries/keys';

export function useIterationMetrics(ref: IterationRef) {
  return useQuery<IterationMetrics, HttpError>({
    queryKey: queryKeys.iterationMetrics(ref),
    queryFn: ({ signal }) => iterationMetricsRequest.execute(ref, signal),
    enabled: Boolean(ref.projectId && ref.iterationId),
  });
}
