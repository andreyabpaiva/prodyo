import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import Badge from "@/components/badge";
import {
  STATUS_SURFACE,
  TASK_STATUS_LABEL_KEY,
  TASK_STATUS_TONE,
} from "@/domain/status";
import TaskCard from "../task-card";
import type { KanbanColumnProps } from "./types";

export default function KanbanColumn({
  status,
  tasks,
  members,
  loading,
  onAdd,
  onOpenTask,
}: KanbanColumnProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-1.75">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-[3px]",
              STATUS_SURFACE[TASK_STATUS_TONE[status]],
            )}
          />
          <span className="text-fine font-semibold text-espresso">
            {t(TASK_STATUS_LABEL_KEY[status])}
          </span>
          <Badge tone="neutral">{tasks.length}</Badge>
        </div>
        <button
          onClick={onAdd}
          aria-label={t("iteration.newTask")}
          className="text-base leading-none text-brand hover:text-brand-dark px-1"
        >
          +
        </button>
      </header>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2.25">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            assignee={members.find(
              (member) => member.user_id === task.assignee_id,
            )}
            onOpen={() => onOpenTask(task.id)}
          />
        ))}
        {!loading && tasks.length === 0 && (
          <button
            onClick={onAdd}
            className="border-[1.5px] border-dashed border-fog rounded-task py-4.5 text-fine text-dust hover:bg-shell/50 transition-colors"
          >
            + {t("iteration.newTask")}
          </button>
        )}
      </div>
    </div>
  );
}
