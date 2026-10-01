import type { Bug } from "@/services/requests/bugs/types";
import type { Improvement } from "@/services/requests/improvements/types";
import type { TaskRef } from "@/services/requests/tasks/types";
import type { DrawerFormProps } from "../types";

export type TaskChildKind = "bug" | "improvement";

export type TaskChild = Bug | Improvement;

export interface TaskChildFormProps extends DrawerFormProps {
  kind: TaskChildKind;
  taskRef: TaskRef;
  source?: TaskChild;
  parentTitle?: string;
}

export interface TaskChildFormValues {
  description: string;
  limitDate: string;
  functionPoints: number;
}
