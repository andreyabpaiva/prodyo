import { cn } from "@/lib/cn";
import { BADGE_SIZE, BADGE_TONE } from "./constants";
import type { BadgeProps } from "./types";

export default function Badge({
  tone = "neutral",
  size = "sm",
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
        BADGE_TONE[tone],
        BADGE_SIZE[size],
        className,
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
