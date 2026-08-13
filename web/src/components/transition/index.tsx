import { AnimatePresence, motion } from "framer-motion";
import {
  TRANSITION_DURATION,
  TRANSITION_EASE,
  TRANSITION_OFFSET,
} from "./constants";
import { getTransitionVariants } from "./utils";
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
  return (
    <AnimatePresence mode={mode} initial={animateOnMount}>
      <motion.div
        key={transitionKey}
        className={className}
        variants={getTransitionVariants(preset, offset)}
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
