import type { BadgeTone } from "@/components/badge/types";
import type { DrawerKind } from "@/contexts/drawer/types";

export const DRAWER_FORM_ID = "drawer-form";

export interface DrawerBadge {
  tone: BadgeTone;
  labelKey: string;
}

export const DRAWER_BADGE: Record<DrawerKind, DrawerBadge> = {
  taskDetail: { tone: "todo", labelKey: "drawer.badge.task" },
  task: { tone: "todo", labelKey: "drawer.badge.task" },
  bug: { tone: "bug", labelKey: "drawer.badge.bug" },
  improvement: { tone: "impro", labelKey: "drawer.badge.improvement" },
  project: { tone: "brand", labelKey: "drawer.badge.project" },
  iteration: { tone: "brand", labelKey: "drawer.badge.iteration" },
  profile: { tone: "neutral", labelKey: "drawer.badge.profile" },
};

export const DRAWER_PRIMARY_CREATE: Record<DrawerKind, string> = {
  taskDetail: "drawer.primary.edit",
  task: "drawer.primary.createTask",
  bug: "drawer.primary.createBug",
  improvement: "drawer.primary.createImprovement",
  project: "drawer.primary.createProject",
  iteration: "drawer.primary.createIteration",
  profile: "nav.logout",
};

export const DRAWER_SAVED: Record<DrawerKind, string> = {
  taskDetail: "",
  task: "drawer.saved.task",
  bug: "drawer.saved.bug",
  improvement: "drawer.saved.improvement",
  project: "drawer.saved.project",
  iteration: "drawer.saved.iteration",
  profile: "",
};
