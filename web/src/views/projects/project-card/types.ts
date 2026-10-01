import type { ProjectOverview } from "../types";

export interface ProjectCardProps {
  overview: ProjectOverview;
  onOpen: () => void;
}
