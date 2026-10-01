import type { IterationRef } from "@/services/requests/iterations/types";
import type { Member } from "@/services/requests/members/types";
import type { Task, TaskStatus } from "@/services/requests/tasks/types";
import type { DrawerFormProps } from "../types";

export interface TaskFormProps extends DrawerFormProps {
  iterationRef: IterationRef;
  source?: Task;
  members: Member[];
  defaultStatus: TaskStatus;
  contextLine: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  tags: string;
  functionPoints: number;
  expectedHours: number;
  spentHours: number;
  status: TaskStatus;
  assigneeId: string;
}
