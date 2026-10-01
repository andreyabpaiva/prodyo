import type { TaskChild, TaskChildKind } from "../../task-child-form/types";

export interface ChildItemProps {
  kind: TaskChildKind;
  item: TaskChild;
  onOpen: () => void;
}
