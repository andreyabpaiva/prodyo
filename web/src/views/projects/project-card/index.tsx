import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import Card from "@/components/card";
import { getProjectAccent } from "@/domain/project";
import { formatTagLine } from "@/domain/tags";
import type { ProjectCardProps } from "./types";

export default function ProjectCard({ overview, onOpen }: ProjectCardProps) {
  const { t } = useTranslation();
  const { project, iterationCount, memberCount } = overview;

  return (
    <Card
      interactive
      onClick={onOpen}
      className="rounded-project p-5.5 shadow-widget hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div
        className={cn("h-1.5 rounded mb-4", getProjectAccent(project.id))}
      />
      <h3 className="font-lora text-base font-semibold text-espresso mb-1.5">
        {project.name}
      </h3>
      <p className="text-fine text-stone leading-normal mb-2.5">
        {project.description}
      </p>
      <div className="text-fine text-dust mb-3">
        {formatTagLine(project.tags)}
      </div>
      <div className="flex gap-4 border-t border-shell pt-3">
        <span className="text-fine text-dust whitespace-nowrap">
          {iterationCount === undefined
            ? "–"
            : t("units.iteration", { count: iterationCount })}
        </span>
        <span className="text-fine text-dust whitespace-nowrap">
          {memberCount === undefined
            ? "–"
            : t("units.member", { count: memberCount })}
        </span>
      </div>
    </Card>
  );
}
