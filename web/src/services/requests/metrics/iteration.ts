import { http } from '@/lib/http';
import { Request } from '@/services/requests/request';
import type { IterationRef } from '@/services/requests/iterations/types';
import { iterationRoutes } from '@/services/routes/iterations';
import type { IterationMetrics } from './types';

export class IterationMetricsRequest extends Request<IterationRef, IterationMetrics> {
  execute(input: IterationRef, signal?: AbortSignal): Promise<IterationMetrics> {
    return http<IterationMetrics>(iterationRoutes.metrics(input.projectId, input.iterationId), { signal });
  }
}

export const iterationMetricsRequest = new IterationMetricsRequest();
