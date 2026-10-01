import type { ReactNode } from "react";

export type BadgeTone =
  | "neutral"
  | "brand"
  | "bug"
  | "impro"
  | "todo"
  | "doing"
  | "done";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}
