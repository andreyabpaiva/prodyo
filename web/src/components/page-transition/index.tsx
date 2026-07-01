import { motion } from "framer-motion";
import type { PageTransitionProps } from "./types";

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
