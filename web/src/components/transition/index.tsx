import { AnimatePresence, motion } from "framer-motion";
import {
  TRANSITION_DURATION,
  TRANSITION_EASE,
  TRANSITION_OFFSET,
} from "./constants";
import { getTransitionCustom, transitionVariants } from "./utils";
import type { TransitionProps } from "./types";

export default function Transition({
  transitionKey,
  preset = "slide-left",
  offset = TRANSITION_OFFSET,
  duration = TRANSITION_DURATION,
  mode = "wait",
  animateOnMount = true,
  className,
  children,
}: TransitionProps) {
  const custom = getTransitionCustom(preset, offset);

  return (
    <AnimatePresence mode={mode} initial={animateOnMount} custom={custom}>
      <motion.div
        key={transitionKey}
        custom={custom}
        className={className}
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration, ease: TRANSITION_EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
