import type { ReactNode } from "react";

export type StatCardTone = "default" | "bug" | "impro";
export type StatCardSize = "sm" | "md";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  tone?: StatCardTone;
  size?: StatCardSize;
  className?: string;
}
