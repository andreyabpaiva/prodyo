import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TopNav from "@/components/top-nav";
import Button from "@/components/button";
import { useDrawer } from "@/contexts/drawer";
import { useSession } from "@/contexts/session";
import { useLogout } from "@/services/mutations/auth/use-logout";
import ProjectCard from "./project-card";
import type { ProjectsViewProps } from "./types";

export default function ProjectsView({ projects }: ProjectsViewProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open } = useDrawer();
  const { user } = useSession();
  const logout = useLogout();

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/", { replace: true }),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav
        userName={user.name}
        onLogoClick={() => navigate("/projects")}
        onProfile={() => open("profile")}
        onLogout={onLogout}
        center={
          <div className="flex items-center gap-0.5">
            <span className="text-sm font-medium text-espresso bg-brand-light px-3.5 py-1.5 rounded-item">
              {t("nav.projects")}
            </span>
            <button
              onClick={() => open("profile")}
              className="text-sm text-stone hover:bg-canvas px-3.5 py-1.5 rounded-item transition-colors"
            >
              {t("nav.settings")}
            </button>
          </div>
        }
      />
      <div className="flex-1 bg-canvas flex flex-col overflow-hidden">
        <header className="px-6 sm:px-10 pt-7 pb-5 flex items-center justify-between">
          <div>
            <h1 className="font-lora text-section font-semibold text-espresso mb-0.5">
              {t("projects.title")}
            </h1>
            <p className="text-fine text-dust">{t("projects.hint")}</p>
          </div>
          <Button size="sm" onClick={() => open("project")}>
            {t("projects.new")}
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
          {projects.map((overview) => (
            <ProjectCard
              key={overview.project.id}
              overview={overview}
              onOpen={() => navigate(`/projects/${overview.project.id}`)}
            />
          ))}
          <button
            onClick={() => open("project")}
            className="border-[1.5px] border-dashed border-ash rounded-project p-5.5 flex flex-col items-center justify-center gap-1.5 min-h-[170px] text-brand hover:bg-brand-light transition-colors"
          >
            <span className="text-2xl leading-none">+</span>
            <span className="text-fine font-medium">{t("projects.new")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
