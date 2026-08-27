"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface HoverFeatureCard {
  name: string;
  description: string;
  href?: string;
  tag?: string;
  count?: string | number;
  icon?: React.ReactNode;
  containerClassName?: string;
  soon?: boolean;
}

export interface HoverFeatureCardsProps {
  items: HoverFeatureCard[];
  className?: string;
  renderLink?: (href: string, children: React.ReactNode) => React.ReactNode;
}

export function HoverFeatureCard({
  item,
  renderLink,
}: {
  item: HoverFeatureCard;
  renderLink?: HoverFeatureCardsProps["renderLink"];
}) {
  const inner = (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: item.href && !item.soon ? 0.98 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      variants={{ rest: { scale: 1, y: 0 } }}
      className={cn(
        "group flex flex-col w-full relative",
        item.soon
          ? "opacity-75 cursor-not-allowed"
          : item.href
            ? "cursor-pointer"
            : "",
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-between rounded-2xl border p-6 z-10 bg-surface transition-all duration-300 w-full min-h-[170px]",
          !item.soon && item.href ? "hover:border-foreground/30 hover:shadow-lg" : "",
          item.soon ? "border-dashed border-border" : "border-border",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {item.icon && (
              <div className="flex items-center justify-center p-2 rounded-xl bg-foreground/5 border border-border/40 text-primary">
                {item.icon}
              </div>
            )}
            {item.tag && (
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                {item.tag}
              </span>
            )}
          </div>
          {item.count && (
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-foreground/10 px-2 text-xs tabular-nums text-foreground/80 font-mono">
              {item.count}
            </span>
          )}
          {item.soon && (
            <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5 bg-card">
              Coming soon
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h3>
        </div>
      </div>

      <motion.div
        variants={{
          rest: { opacity: 0, y: -24 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="overflow-hidden z-0 w-[94%] self-center"
      >
        <div className="py-3 px-5 relative border-t-0 rounded-b-2xl border border-border bg-surface/60 backdrop-blur-sm">
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  if (item.href && renderLink) {
    return renderLink(item.href, inner);
  }

  return inner;
}

export function HoverFeatureCards({
  items,
  className,
  renderLink,
}: HoverFeatureCardsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full",
        className,
      )}
    >
      {items.map((item) => (
        <HoverFeatureCard key={item.name} item={item} renderLink={renderLink} />
      ))}
    </div>
  );
}
