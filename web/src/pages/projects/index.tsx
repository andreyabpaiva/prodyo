import { useQueries } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import StatusScreen from "@/components/status-screen";
import { useProjects } from "@/services/queries/projects/use-projects";
import { iterationsQueryOptions } from "@/services/queries/iterations/use-iterations";
import { membersQueryOptions } from "@/services/queries/members/use-members";
import ProjectsView from "@/views/projects";
import type { ProjectOverview } from "@/views/projects/types";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const projects = useProjects();
  const list = projects.data ?? [];

  const iterations = useQueries({
    queries: list.map((project) =>
      iterationsQueryOptions({ projectId: project.id }),
    ),
  });
  const members = useQueries({
    queries: list.map((project) =>
      membersQueryOptions({ projectId: project.id }),
    ),
  });

  if (projects.isPending) return <StatusScreen message={t("common.loading")} />;
  if (projects.isError) return <StatusScreen message={t("common.loadError")} />;

  const overviews: ProjectOverview[] = list.map((project, index) => ({
    project,
    iterationCount: iterations[index]?.data?.length,
    memberCount: members[index]?.data?.length,
  }));

  return <ProjectsView projects={overviews} />;
}
