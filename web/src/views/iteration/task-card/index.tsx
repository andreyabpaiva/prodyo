import { cn } from "@/lib/cn";
import { formatHours } from "@/lib/duration";
import Card from "@/components/card";
import Badge from "@/components/badge";
import Avatar from "@/components/avatar";
import { formatTagLine } from "@/domain/tags";
import { getInitial } from "@/domain/user";
import type { TaskCardProps } from "./types";

export default function TaskCard({ task, assignee, onOpen }: TaskCardProps) {
  return (
    <Card
      interactive
      onClick={onOpen}
      className={cn(
        "rounded-task p-3.5 shadow-task hover:shadow-task-hover",
        task.status === "Done" && "opacity-[.78] hover:opacity-100",
      )}
    >
      <div className="text-sm font-medium text-espresso leading-snug mb-1.75">
        {task.title}
      </div>
      <div className="text-fine text-dust mb-2.75">
        {formatTagLine(task.tags)}
      </div>
      <div className="flex items-center gap-1.5">
        <Badge tone="brand">{task.function_points}fp</Badge>
        <Badge tone="neutral">
          {formatHours(task.time_spent)} / {formatHours(task.expected_time)}
        </Badge>
        <Avatar
          tone="soft"
          size="xs"
          initial={assignee ? getInitial(assignee.name) : "–"}
          className="ml-auto"
        />
      </div>
    </Card>
  );
}
