"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimationType = "scale" | "slide" | "fade" | "bounce";

export interface AnimatedListProps<T> {
  /** index 0 = newest */
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** @default 8 */
  maxVisible?: number;
  /** @default 12 */
  gap?: number;
  /** @default "scale" */
  animation?: AnimationType;
  className?: string;
}

function getAnimationVariants(type: AnimationType) {
  switch (type) {
    case "slide":
      return {
        initial: { opacity: 0, y: -24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      };
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    case "bounce":
      return {
        initial: { opacity: 0, y: -16, scale: 0.85 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.85 },
      };
    case "scale":
    default:
      return {
        initial: { opacity: 0, y: -16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.92 },
      };
  }
}

export function AnimatedList<T extends { id: string | number } | { slug: string }>({
  items,
  renderItem,
  maxVisible = 8,
  gap = 12,
  animation = "scale",
  className,
}: AnimatedListProps<T>) {
  const visible = items.slice(0, maxVisible);
  const variants = getAnimationVariants(animation);

  return (
    <div className={cn("flex flex-col", className)} style={{ gap: `${gap}px` }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((item, index) => {
          const key = "id" in item ? item.id : "slug" in item ? item.slug : index;
          return (
            <motion.div
              key={key}
              layout
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
                layout: { type: "spring", stiffness: 350, damping: 28 },
              }}
            >
              {renderItem(item, index)}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
