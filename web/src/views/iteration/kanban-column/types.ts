import type { Member } from "@/services/requests/members/types";
import type { Task, TaskStatus } from "@/services/requests/tasks/types";

export interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  members: Member[];
  loading: boolean;
  onAdd: () => void;
  onOpenTask: (taskId: string) => void;
}
