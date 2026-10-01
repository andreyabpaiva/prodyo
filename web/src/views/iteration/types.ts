import type { Iteration } from "@/services/requests/iterations/types";
import type { Member } from "@/services/requests/members/types";
import type { IterationMetrics } from "@/services/requests/metrics/types";
import type { Project } from "@/services/requests/projects/types";
import type { Task } from "@/services/requests/tasks/types";

export interface IterationViewProps {
  project: Project;
  iterations: Iteration[];
  iteration: Iteration;
  tasks: Task[];
  tasksLoading: boolean;
  members: Member[];
  metrics?: IterationMetrics;
}
