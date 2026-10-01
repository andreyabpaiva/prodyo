import type { BadgeSize, BadgeTone } from "./types";

export const BADGE_TONE: Record<BadgeTone, string> = {
  neutral: "bg-shell text-dust",
  brand: "bg-brand-light text-brand",
  bug: "bg-bug-bg text-bug",
  impro: "bg-impro-bg text-impro",
  todo: "bg-status-todo text-status-todo-dot",
  doing: "bg-status-doing text-status-doing-dot",
  done: "bg-status-done text-status-done-dot",
};

export const BADGE_SIZE: Record<BadgeSize, string> = {
  sm: "text-caption px-2 py-0.5",
  md: "text-fine px-2.75 py-1",
};
