import type { Bug } from "@/services/requests/bugs/types";
import type { Improvement } from "@/services/requests/improvements/types";
import type { Member } from "@/services/requests/members/types";
import type { Task } from "@/services/requests/tasks/types";

export interface TaskDetailProps {
  task: Task;
  assignee?: Member;
  bugs: Bug[];
  improvements: Improvement[];
  childrenLoading: boolean;
}
