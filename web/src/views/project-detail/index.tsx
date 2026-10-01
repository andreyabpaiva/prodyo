import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import TopNav from "@/components/top-nav";
import Button from "@/components/button";
import StatCard from "@/components/stat-card";
import Avatar from "@/components/avatar";
import { useDrawer } from "@/contexts/drawer";
import { useSession } from "@/contexts/session";
import { getProjectAccent } from "@/domain/project";
import { formatTagLine } from "@/domain/tags";
import { getInitial } from "@/domain/user";
import type { IterationStatus } from "@/services/requests/iterations/types";
import IterationRow from "./iteration-row";
import type { ProjectDetailViewProps } from "./types";

export default function ProjectDetailView({
  project,
  iterations,
  members,
  metrics,
}: ProjectDetailViewProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open } = useDrawer();
  const { user } = useSession();

  const countByStatus = (status: IterationStatus) =>
    iterations.filter((iteration) => iteration.status === status).length;
  const metricsFor = (iterationId: string) =>
    metrics.find((item) => item.iteration_id === iterationId);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav
        userName={user.name}
        onLogoClick={() => navigate("/projects")}
        onProfile={() => open("profile")}
        center={
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={() => navigate("/projects")}
              className="text-fine text-dust hover:text-brand transition-colors"
            >
              {t("nav.projects")}
            </button>
            <span className="text-caption text-fog">/</span>
            <span className="text-fine font-medium text-espresso truncate">
              {project.name}
            </span>
          </div>
        }
      />
      <div className="flex-1 bg-canvas overflow-y-auto px-6 sm:px-10 pt-7 pb-10">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="max-w-2xl">
            <div
              className={cn(
                "h-1.5 w-16 rounded mb-3.5",
                getProjectAccent(project.id),
              )}
            />
            <h1 className="font-lora text-[30px] leading-tight font-semibold text-espresso mb-2">
              {project.name}
            </h1>
            <p className="text-cta text-stone leading-relaxed mb-2.5">
              {project.description}
            </p>
            <div className="text-fine text-dust">
              {formatTagLine(project.tags)}
            </div>
          </div>
          <div className="flex gap-2.5 flex-shrink-0">
            <Button
              variant="soft"
              tone="neutral"
              size="sm"
              onClick={() => open("project", { mode: "edit" })}
            >
              {t("project.editProject")}
            </Button>
            <Button size="sm" onClick={() => open("iteration")}>
              {t("project.newIteration")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-7">
          <StatCard
            label={t("metrics.iterations")}
            value={iterations.length}
          />
          <StatCard
            label={t("iterationStatus.Planned")}
            value={countByStatus("Planned")}
          />
          <StatCard
            label={t("iterationStatus.Active")}
            value={countByStatus("Active")}
          />
          <StatCard
            label={t("iterationStatus.Completed")}
            value={countByStatus("Completed")}
          />
          <StatCard label={t("project.members")} value={members.length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="font-lora text-subhead font-semibold text-espresso">
                {t("project.iterations")}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => open("iteration")}
              >
                {t("project.newIteration")}
              </Button>
            </div>
            {iterations.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {iterations.map((iteration) => (
                  <IterationRow
                    key={iteration.id}
                    iteration={iteration}
                    metrics={metricsFor(iteration.id)}
                    onOpen={() =>
                      navigate(
                        `/projects/${project.id}/iterations/${iteration.id}`,
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="border-[1.5px] border-dashed border-ash rounded-[14px] p-8 text-center">
                <p className="text-sm text-stone mb-3.5">
                  {t("project.emptyIterations")}
                </p>
                <Button size="sm" onClick={() => open("iteration")}>
                  {t("project.newIteration")}
                </Button>
              </div>
            )}
          </div>

          <div className="bg-paper rounded-[14px] p-4.5 shadow-task">
            <div className="text-micro font-semibold text-dust uppercase tracking-wide mb-3.5">
              {t("project.members")}
            </div>
            <div className="flex flex-col gap-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-2.75">
                  <Avatar
                    tone="soft"
                    initial={getInitial(member.name)}
                    size="md"
                  />
                  <div className="min-w-0">
                    <div className="text-fine font-medium text-espresso">
                      {member.name}
                    </div>
                    <div className="text-caption text-dust">
                      {member.roles.map((role) => t(`role.${role}`)).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
