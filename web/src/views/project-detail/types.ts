import type { Iteration } from "@/services/requests/iterations/types";
import type { Member } from "@/services/requests/members/types";
import type { IterationMetrics } from "@/services/requests/metrics/types";
import type { Project } from "@/services/requests/projects/types";

export interface ProjectDetailViewProps {
  project: Project;
  iterations: Iteration[];
  members: Member[];
  metrics: IterationMetrics[];
}
