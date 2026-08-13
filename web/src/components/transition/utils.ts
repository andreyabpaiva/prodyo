import type { Variants } from "framer-motion";
import { TRANSITION_DIRECTION, TRANSITION_OFFSET } from "./constants";
import type { TransitionCustom, TransitionPreset } from "./types";

function getDisplacement(
  preset: TransitionPreset,
  offset: number,
  sign: number
) {
  if (preset === "fade") {
    return {};
  }

  const { axis, sign: presetSign } = TRANSITION_DIRECTION[preset];
  const value = sign * presetSign * offset;

  return axis === "x" ? { x: value } : { y: value };
}

export function getTransitionCustom(
  preset: TransitionPreset,
  offset: number = TRANSITION_OFFSET
): TransitionCustom {
  return { preset, offset };
}

export const transitionVariants: Variants = {
  initial: ({ preset, offset }: TransitionCustom) => ({
    opacity: 0,
    ...getDisplacement(preset, offset, 1),
  }),
  animate: { opacity: 1, x: 0, y: 0 },
  exit: ({ preset, offset }: TransitionCustom) => ({
    opacity: 0,
    ...getDisplacement(preset, offset, -1),
  }),
};
