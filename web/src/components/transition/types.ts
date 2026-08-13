import type { ReactNode } from "react";

export type TransitionPreset =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down";

export type TransitionSlidePreset = Exclude<TransitionPreset, "fade">;

export type TransitionMode = "wait" | "sync" | "popLayout";

export interface TransitionCustom {
  preset: TransitionPreset;
  offset: number;
}

export interface TransitionProps {
  transitionKey: string;
  preset?: TransitionPreset;
  offset?: number;
  duration?: number;
  mode?: TransitionMode;
  animateOnMount?: boolean;
  className?: string;
  children: ReactNode;
}
