import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusScreen from "@/components/status-screen";
import { useProject } from "@/services/queries/projects/use-project";
import { useIterations } from "@/services/queries/iterations/use-iterations";
import { useMembers } from "@/services/queries/members/use-members";
import { useTasks } from "@/services/queries/tasks/use-tasks";
import { useIterationMetrics } from "@/services/queries/metrics/use-iteration-metrics";
import IterationView from "@/views/iteration";

export default function IterationPage() {
  const { t } = useTranslation();
  const { projectId = "", iterationId = "" } = useParams();
  const project = useProject({ projectId });
  const iterations = useIterations({ projectId });
  const members = useMembers({ projectId });
  const tasks = useTasks({ projectId, iterationId });
  const metrics = useIterationMetrics({ projectId, iterationId });

  if (project.isError || iterations.isError) {
    return <Navigate to="/projects" replace />;
  }

  if (project.isPending || iterations.isPending) {
    return <StatusScreen message={t("common.loading")} />;
  }

  const iteration = iterations.data.find((item) => item.id === iterationId);
  if (!iteration) {
    return <Navigate to={`/projects/${projectId}`} replace />;
  }

  return (
    <IterationView
      project={project.data}
      iterations={iterations.data}
      iteration={iteration}
      tasks={tasks.data ?? []}
      tasksLoading={tasks.isPending}
      members={members.data ?? []}
      metrics={metrics.data}
    />
  );
}
