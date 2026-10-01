import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusScreen from "@/components/status-screen";
import { useProject } from "@/services/queries/projects/use-project";
import { useIterations } from "@/services/queries/iterations/use-iterations";
import { useMembers } from "@/services/queries/members/use-members";
import { useProjectMetrics } from "@/services/queries/metrics/use-project-metrics";
import ProjectDetailView from "@/views/project-detail";

export default function ProjectDetailPage() {
  const { t } = useTranslation();
  const { projectId = "" } = useParams();
  const project = useProject({ projectId });
  const iterations = useIterations({ projectId });
  const members = useMembers({ projectId });
  const metrics = useProjectMetrics({ projectId });

  if (project.isError || iterations.isError) {
    return <Navigate to="/projects" replace />;
  }

  if (project.isPending || iterations.isPending) {
    return <StatusScreen message={t("common.loading")} />;
  }

  return (
    <ProjectDetailView
      project={project.data}
      iterations={iterations.data}
      members={members.data ?? []}
      metrics={metrics.data?.iterations ?? []}
    />
  );
}
