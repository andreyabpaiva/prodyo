import { motion } from "framer-motion";
import { ANIMATED_CHECK_CYCLE_DURATION } from "./constants";
import { getAnimatedCheckTimes } from "./utils";
import type { AnimatedCheckProps } from "./types";

export default function AnimatedCheck({ index }: AnimatedCheckProps) {
  return (
    <div className="w-4.5 h-4.5 bg-white/20 rounded flex-shrink-0 mt-0.5">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <motion.path
          d="M3.5 9.5 L7.5 13.5 L14.5 5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 0, 1, 1, 0, 0],
            opacity: [0, 0, 1, 1, 0, 0],
          }}
          transition={{
            duration: ANIMATED_CHECK_CYCLE_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
            times: getAnimatedCheckTimes(index),
          }}
        />
      </svg>
    </div>
  );
}
