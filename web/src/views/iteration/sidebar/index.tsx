import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import { cn } from "@/lib/cn";
import Logo from "@/components/logo";
import Avatar from "@/components/avatar";
import { useDrawer } from "@/contexts/drawer";
import { useSession } from "@/contexts/session";
import { ITERATION_STATUS_TONE, STATUS_SURFACE } from "@/domain/status";
import { getFirstName, getInitial } from "@/domain/user";
import type { IterationSidebarProps } from "./types";

export default function IterationSidebar({
  project,
  iterations,
  currentIterationId,
}: IterationSidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { open } = useDrawer();
  const { user } = useSession();

  return (
    <aside className="w-56 bg-shell flex flex-col flex-shrink-0">
      <button
        onClick={() => navigate("/projects")}
        className="px-5 pt-5.5 pb-4.5 border-b border-black/[.07] flex items-center"
      >
        <Logo size="md" />
      </button>
      <button
        onClick={() => navigate(`/projects/${project.id}`)}
        className="px-5 pt-3 pb-2.5 border-b border-black/[.07] text-left hover:bg-brand/[.08] transition-colors"
      >
        <div className="text-micro font-medium text-dust tracking-wide uppercase mb-0.5">
          {t("iteration.projectLabel")}
        </div>
        <div className="text-sm font-medium text-espresso truncate">
          {project.name}
        </div>
      </button>
      <div className="p-2.5 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-3 pt-1.5 pb-2">
          <span className="text-micro font-semibold text-dust tracking-wide uppercase">
            {t("project.iterations")}
          </span>
          <button
            onClick={() => open("iteration")}
            aria-label={t("project.newIteration")}
            className="text-cta leading-none text-brand hover:text-brand-dark px-1"
          >
            +
          </button>
        </div>
        {iterations.map((iteration) => {
          const active = iteration.id === currentIterationId;
          return (
            <button
              key={iteration.id}
              onClick={() =>
                navigate(`/projects/${project.id}/iterations/${iteration.id}`)
              }
              className={cn(
                "w-full flex items-center gap-2.25 px-3 py-2.25 rounded-item mb-0.5 text-left transition-colors",
                active ? "bg-brand/[.14]" : "hover:bg-brand/[.08]",
              )}
            >
              <span
                className={cn(
                  "w-1.75 h-1.75 rounded-full flex-shrink-0",
                  STATUS_SURFACE[ITERATION_STATUS_TONE[iteration.status]],
                )}
              />
              <span
                className={cn(
                  "text-fine truncate",
                  active
                    ? "font-semibold text-espresso"
                    : "font-normal text-stone",
                )}
              >
                #{iteration.increment} · {iteration.goal}
              </span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-black/[.07] p-2.5">
        <button
          onClick={() => open("profile")}
          className="w-full flex items-center gap-2.5 px-3 py-2.25 rounded-item hover:bg-brand/[.08] transition-colors"
        >
          <Settings size={16} className="text-ash" />
          <span className="text-sm text-stone">{t("nav.settings")}</span>
        </button>
      </div>
      <button
        onClick={() => open("profile")}
        className="px-5 py-3.25 border-t border-black/[.07] flex items-center gap-2.5 text-left hover:bg-brand/[.08] transition-colors"
      >
        <Avatar initial={getInitial(user.name)} size="lg" />
        <div className="min-w-0">
          <div className="text-fine font-medium text-espresso">
            {getFirstName(user.name)}
          </div>
          <div className="text-caption text-dust truncate">
            {user.email}
          </div>
        </div>
      </button>
    </aside>
  );
}
