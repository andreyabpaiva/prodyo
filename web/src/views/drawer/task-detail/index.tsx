import { useTranslation } from "react-i18next";
import Badge from "@/components/badge";
import Button from "@/components/button";
import { useDrawer } from "@/contexts/drawer";
import { formatHours } from "@/lib/duration";
import { TASK_STATUS_LABEL_KEY, TASK_STATUS_TONE } from "@/domain/status";
import ChildItem from "./child-item";
import type { TaskDetailProps } from "./types";

export default function TaskDetail({
  task,
  assignee,
  bugs,
  improvements,
  childrenLoading,
}: TaskDetailProps) {
  const { t } = useTranslation();
  const { open } = useDrawer();

  return (
    <div>
      <div className="mb-4.5 flex items-center gap-2">
        <Badge tone={TASK_STATUS_TONE[task.status]} size="md" dot>
          {t(TASK_STATUS_LABEL_KEY[task.status])}
        </Badge>
        <span className="text-fine text-dust">
          {assignee?.name ?? t("drawer.unassigned")}
        </span>
      </div>

      {task.description && (
        <div className="mb-4">
          <div className="text-micro font-semibold text-dust uppercase tracking-wide mb-1.5">
            {t("drawer.fields.description")}
          </div>
          <p className="text-fine text-stone leading-relaxed">
            {task.description}
          </p>
        </div>
      )}

      <div className="bg-canvas rounded-xl px-4 py-3.5 mb-4 grid grid-cols-3 gap-3">
        <div>
          <div className="text-nano font-semibold text-dust uppercase tracking-wide mb-1">
            {t("metrics.fp")}
          </div>
          <div className="text-lg font-bold text-espresso">
            {task.function_points}
          </div>
        </div>
        <div>
          <div className="text-nano font-semibold text-dust uppercase tracking-wide mb-1">
            {t("metrics.expected")}
          </div>
          <div className="text-lg font-bold text-espresso">
            {formatHours(task.expected_time)}
          </div>
        </div>
        <div>
          <div className="text-nano font-semibold text-dust uppercase tracking-wide mb-1">
            {t("metrics.spent")}
          </div>
          <div className="text-lg font-bold text-espresso">
            {formatHours(task.time_spent)}
          </div>
        </div>
      </div>

      {task.tags.length > 0 && (
        <div className="mb-4.5">
          <div className="text-micro font-semibold text-dust uppercase tracking-wide mb-1.75">
            {t("drawer.fields.tagsPlain")}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag) => (
              <Badge key={tag} tone="brand">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <section className="mb-4">
        <div className="flex items-center justify-between mb-2.25">
          <div className="flex items-center gap-2">
            <span className="text-micro font-semibold text-dust uppercase tracking-wide">
              {t("metrics.bugs")}
            </span>
            <Badge tone="bug">{bugs.length}</Badge>
          </div>
          <Button
            tone="bug"
            variant="soft"
            size="sm"
            onClick={() => open("bug", { taskId: task.id, from: "taskDetail" })}
          >
            + {t("drawer.badge.bug")}
          </Button>
        </div>
        {bugs.map((bug) => (
          <ChildItem
            key={bug.id}
            kind="bug"
            item={bug}
            onOpen={() =>
              open("bug", {
                mode: "edit",
                taskId: task.id,
                itemId: bug.id,
                from: "taskDetail",
              })
            }
          />
        ))}
        {bugs.length === 0 && (
          <div className="text-fine text-muted py-2">
            {childrenLoading ? t("common.loading") : t("drawer.empty.bugs")}
          </div>
        )}
      </section>

      <section className="mb-5.5">
        <div className="flex items-center justify-between mb-2.25">
          <div className="flex items-center gap-2">
            <span className="text-micro font-semibold text-dust uppercase tracking-wide">
              {t("metrics.improvements")}
            </span>
            <Badge tone="impro">{improvements.length}</Badge>
          </div>
          <Button
            tone="impro"
            variant="soft"
            size="sm"
            onClick={() =>
              open("improvement", { taskId: task.id, from: "taskDetail" })
            }
          >
            + {t("drawer.badge.improvement")}
          </Button>
        </div>
        {improvements.map((improvement) => (
          <ChildItem
            key={improvement.id}
            kind="improvement"
            item={improvement}
            onOpen={() =>
              open("improvement", {
                mode: "edit",
                taskId: task.id,
                itemId: improvement.id,
                from: "taskDetail",
              })
            }
          />
        ))}
        {improvements.length === 0 && (
          <div className="text-fine text-muted py-2">
            {childrenLoading
              ? t("common.loading")
              : t("drawer.empty.improvements")}
          </div>
        )}
      </section>
    </div>
  );
}
