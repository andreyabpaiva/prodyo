import type { Member } from "@/services/requests/members/types";
import type { Task } from "@/services/requests/tasks/types";

export interface TaskCardProps {
  task: Task;
  assignee?: Member;
  onOpen: () => void;
}
