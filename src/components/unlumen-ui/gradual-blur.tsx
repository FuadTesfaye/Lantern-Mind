"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GradualBlur({
  position = "bottom",
  className,
}: {
  position?: "top" | "bottom";
  className?: string;
}) {
  const isTop = position === "top";

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 right-0 z-40 h-20 w-full transition-opacity duration-300",
        isTop ? "top-0" : "bottom-0",
        className,
      )}
      style={{
        background: isTop
          ? "linear-gradient(to bottom, hsl(var(--background) / 0.85), transparent)"
          : "linear-gradient(to top, hsl(var(--background) / 0.85), transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        maskImage: isTop
          ? "linear-gradient(to bottom, black 30%, transparent)"
          : "linear-gradient(to top, black 30%, transparent)",
        WebkitMaskImage: isTop
          ? "linear-gradient(to bottom, black 30%, transparent)"
          : "linear-gradient(to top, black 30%, transparent)",
      }}
      aria-hidden="true"
    />
  );
}
