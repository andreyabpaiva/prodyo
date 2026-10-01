import { cn } from "@/lib/cn";
import { STAT_CARD_SIZE, STAT_CARD_TONE } from "./constants";
import type { StatCardProps } from "./types";

export default function StatCard({
  label,
  value,
  tone = "default",
  size = "md",
  className,
}: StatCardProps) {
  const sizes = STAT_CARD_SIZE[size];

  return (
    <div
      className={cn(
        "bg-paper border border-shell rounded-xl",
        sizes.container,
        className,
      )}
    >
      <div className="text-nano font-semibold text-dust uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={cn("font-semibold", sizes.value, STAT_CARD_TONE[tone])}>
        {value}
      </div>
    </div>
  );
}
