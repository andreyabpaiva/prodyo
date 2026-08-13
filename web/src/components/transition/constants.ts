import type { TransitionSlidePreset } from "./types";

export const TRANSITION_DURATION = 0.22;
export const TRANSITION_OFFSET = 40;
export const TRANSITION_EASE = "easeInOut";

export const TRANSITION_DIRECTION: Record<
  TransitionSlidePreset,
  { axis: "x" | "y"; sign: number }
> = {
  "slide-left": { axis: "x", sign: 1 },
  "slide-right": { axis: "x", sign: -1 },
  "slide-up": { axis: "y", sign: 1 },
  "slide-down": { axis: "y", sign: -1 },
};
