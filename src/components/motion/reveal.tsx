import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Reveal once on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Fades, de-blurs and lifts its children into place. */
export function Reveal({ children, delay = 0, className, immediate = false }: RevealProps) {
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...trigger}
      transition={{ duration: 0.9, delay, ease: EASE_APPLE }}
    >
      {children}
    </motion.div>
  );
}
