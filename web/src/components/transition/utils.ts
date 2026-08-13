import type { Variants } from "framer-motion";
import { TRANSITION_DIRECTION, TRANSITION_OFFSET } from "./constants";
import type { TransitionPreset } from "./types";

export function getTransitionVariants(
  preset: TransitionPreset,
  offset: number = TRANSITION_OFFSET
): Variants {
  if (preset === "fade") {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  const { axis, sign } = TRANSITION_DIRECTION[preset];
  const enter = axis === "x" ? { x: sign * offset } : { y: sign * offset };
  const leave = axis === "x" ? { x: -sign * offset } : { y: -sign * offset };

  return {
    initial: { opacity: 0, ...enter },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...leave },
  };
}
