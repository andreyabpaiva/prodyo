import type { TaskChildKind } from "./types";

export const TASK_CHILD_PLACEHOLDER_KEY: Record<TaskChildKind, string> = {
  bug: "drawer.placeholders.bugDescription",
  improvement: "drawer.placeholders.improvementDescription",
};
