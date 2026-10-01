import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/lang-toggle";
import Button from "@/components/button";
import Badge from "@/components/badge";
import StatCard from "@/components/stat-card";
import { useDrawer } from "@/contexts/drawer";
import { formatDate } from "@/lib/date";
import { formatHours } from "@/lib/duration";
import {
  ITERATION_STATUS_LABEL_KEY,
  ITERATION_STATUS_TONE,
  TASK_STATUSES,
} from "@/domain/status";
import {
  formatPercent,
  sumExpectedTime,
  sumFunctionPoints,
  sumTimeSpent,
} from "@/domain/metrics";
import type { TaskStatus } from "@/services/requests/tasks/types";
import IterationSidebar from "./sidebar";
import KanbanColumn from "./kanban-column";
import type { IterationViewProps } from "./types";

export default function IterationView({
  project,
  iterations,
  iteration,
  tasks,
  tasksLoading,
  members,
  metrics,
}: IterationViewProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { open } = useDrawer();

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="h-screen flex overflow-hidden">
      <IterationSidebar
        project={project}
        iterations={iterations}
        currentIterationId={iteration.id}
      />
      <div className="flex-1 bg-canvas flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-fog flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1.75 mb-0.75">
              <button
                onClick={() => navigate(`/projects/${project.id}`)}
                className="text-caption text-dust hover:text-brand transition-colors"
              >
                {project.name}
              </button>
              <span className="text-caption text-fog">/</span>
              <span className="text-caption font-semibold text-dust">
                #{iteration.increment}
              </span>
              <span className="w-0.75 h-0.75 bg-ash rounded-full" />
              <span className="text-caption text-dust">
                {formatDate(iteration.start_at, i18n.language)} —{" "}
                {formatDate(iteration.end_at, i18n.language)}
              </span>
            </div>
            <h2 className="font-lora text-subhead font-semibold text-espresso truncate">
              {iteration.goal}
            </h2>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Badge tone={ITERATION_STATUS_TONE[iteration.status]} size="md">
              {t(ITERATION_STATUS_LABEL_KEY[iteration.status])}
            </Badge>
            <Button
              variant="soft"
              tone="neutral"
              size="sm"
              onClick={() => open("iteration", { mode: "edit" })}
            >
              {t("iteration.edit")}
            </Button>
            <Button size="sm" onClick={() => open("task", { status: "Todo" })}>
              {t("iteration.newTask")}
            </Button>
            <LangToggle />
          </div>
        </header>

        <div className="px-6 py-3 flex gap-2.5 border-b border-fog flex-shrink-0 overflow-x-auto">
          <StatCard
            size="sm"
            label={t("metrics.fp")}
            value={sumFunctionPoints(tasks).toFixed(1)}
          />
          <StatCard
            size="sm"
            label={t("metrics.expected")}
            value={formatHours(sumExpectedTime(tasks))}
          />
          <StatCard
            size="sm"
            label={t("metrics.spent")}
            value={formatHours(sumTimeSpent(tasks))}
          />
          <StatCard size="sm" label={t("metrics.tasks")} value={tasks.length} />
          <StatCard
            size="sm"
            label={t("metrics.velocity")}
            value={formatPercent(metrics?.velocity)}
          />
          <StatCard
            size="sm"
            tone="bug"
            label={t("metrics.rework")}
            value={formatPercent(metrics?.rework_index)}
          />
          <StatCard
            size="sm"
            tone="impro"
            label={t("metrics.instability")}
            value={formatPercent(metrics?.instability_index)}
          />
        </div>

        <div className="flex-1 overflow-hidden flex gap-3.5 px-6 py-4">
          {TASK_STATUSES.map((status, index) => (
            <Fragment key={status}>
              {index > 0 && <div className="w-px bg-fog flex-shrink-0" />}
              <KanbanColumn
                status={status}
                tasks={tasksByStatus(status)}
                members={members}
                loading={tasksLoading}
                onAdd={() => open("task", { status })}
                onOpenTask={(taskId) => open("taskDetail", { taskId })}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
