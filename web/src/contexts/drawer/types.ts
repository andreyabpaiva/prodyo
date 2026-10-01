import type { ReactNode } from "react";
import type { TaskStatus } from "@/services/requests/tasks/types";

export type DrawerKind =
  | "taskDetail"
  | "task"
  | "bug"
  | "improvement"
  | "project"
  | "iteration"
  | "profile";

export type DrawerMode = "create" | "edit";

export interface DrawerRequest {
  kind: DrawerKind;
  mode: DrawerMode;
  taskId?: string;
  itemId?: string;
  status?: TaskStatus;
  from?: DrawerKind;
}

export type OpenDrawerOptions = Omit<Partial<DrawerRequest>, "kind">;

export interface DrawerContextValue {
  request: DrawerRequest | null;
  open: (kind: DrawerKind, options?: OpenDrawerOptions) => void;
  close: () => void;
}

export interface DrawerProviderProps {
  children: ReactNode;
}
