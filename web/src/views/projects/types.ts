import type { Project } from "@/services/requests/projects/types";

export interface ProjectOverview {
  project: Project;
  iterationCount?: number;
  memberCount?: number;
}

export interface ProjectsViewProps {
  projects: ProjectOverview[];
}
