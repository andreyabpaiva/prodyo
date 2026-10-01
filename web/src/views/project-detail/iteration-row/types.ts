import type { Iteration } from "@/services/requests/iterations/types";
import type { IterationMetrics } from "@/services/requests/metrics/types";

export interface IterationRowProps {
  iteration: Iteration;
  metrics?: IterationMetrics;
  onOpen: () => void;
}
