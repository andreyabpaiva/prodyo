import type { Iteration } from "@/services/requests/iterations/types";
import type { Project } from "@/services/requests/projects/types";

export interface IterationSidebarProps {
  project: Project;
  iterations: Iteration[];
  currentIterationId: string;
}
