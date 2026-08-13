import { motion } from "framer-motion";
import {
  TRANSITION_DURATION,
  TRANSITION_EASE,
} from "@/components/transition/constants";
import { getTransitionVariants } from "@/components/transition/utils";
import type { PageTransitionProps } from "./types";

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={getTransitionVariants("slide-left")}
      initial="initial"
      animate="animate"
      transition={{ duration: TRANSITION_DURATION, ease: TRANSITION_EASE }}
    >
      {children}
    </motion.div>
  );
}
