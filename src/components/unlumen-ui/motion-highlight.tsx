"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MotionHighlightProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  activeId?: string | null;
  layoutId?: string;
}

export function MotionHighlightContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="motion-highlight-container"
      className={cn("relative flex items-center p-1 rounded-full bg-surface border border-border/80", className)}
    >
      {children}
    </div>
  );
}

export function MotionHighlightItem({
  children,
  isActive,
  onClick,
  className,
  layoutId = "active-pill",
  asChild,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  layoutId?: string;
  asChild?: boolean;
}) {
  return (
    <div className="relative inline-flex">
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-background border border-border/70 shadow-sm"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
          style={{ zIndex: 0 }}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative z-10 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1.5",
          isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground/90",
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
}
