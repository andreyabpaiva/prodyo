import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";
import Card from "@/components/card";
import Badge from "@/components/badge";
import {
  ITERATION_STATUS_LABEL_KEY,
  ITERATION_STATUS_TONE,
  STATUS_SURFACE,
} from "@/domain/status";
import { formatPercent } from "@/domain/metrics";
import type { IterationRowProps } from "./types";

export default function IterationRow({
  iteration,
  metrics,
  onOpen,
}: IterationRowProps) {
  const { t, i18n } = useTranslation();
  const tone = ITERATION_STATUS_TONE[iteration.status];

  return (
    <Card
      interactive
      onClick={onOpen}
      className="rounded-[14px] p-4 px-4.5 flex items-center gap-4.5 shadow-task hover:shadow-task-hover"
    >
      <div
        className={cn(
          "w-10 h-10 rounded-[11px] flex items-center justify-center flex-shrink-0",
          STATUS_SURFACE[tone],
        )}
      >
        <span className="text-fine font-bold">#{iteration.increment}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-cta font-medium text-espresso mb-0.5">
          {iteration.goal}
        </div>
        <div className="text-fine text-dust whitespace-nowrap">
          {formatDate(iteration.start_at, i18n.language)} —{" "}
          {formatDate(iteration.end_at, i18n.language)} ·{" "}
          {t("metrics.velocity")} {formatPercent(metrics?.velocity)}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {metrics && metrics.rework_index > 0 && (
          <Badge tone="bug">
            {t("metrics.reworkShort", {
              value: formatPercent(metrics.rework_index),
            })}
          </Badge>
        )}
        {metrics && metrics.instability_index > 0 && (
          <Badge tone="impro">
            {t("metrics.instabilityShort", {
              value: formatPercent(metrics.instability_index),
            })}
          </Badge>
        )}
        <Badge tone={tone} dot>
          {t(ITERATION_STATUS_LABEL_KEY[iteration.status])}
        </Badge>
        <span className="text-sm text-ash">›</span>
      </div>
    </Card>
  );
}
