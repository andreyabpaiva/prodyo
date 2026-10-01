import type { Project } from "@/services/requests/projects/types";
import type { DrawerFormProps } from "../types";

export interface ProjectFormProps extends DrawerFormProps {
  source?: Project;
}

export interface ProjectFormValues {
  name: string;
  description: string;
  tags: string;
}
