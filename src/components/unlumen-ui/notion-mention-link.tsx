"use client";

import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export interface NotionMentionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  category?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function NotionMentionLink({
  href,
  title,
  category,
  description,
  icon,
  className,
  ...props
}: NotionMentionLinkProps) {
  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/80 px-2.5 py-1 text-xs font-medium text-foreground transition-all duration-150 hover:border-foreground/30 hover:bg-surface hover:text-primary",
            className,
          )}
          {...props}
        >
          {icon ? (
            <span className="text-primary">{icon}</span>
          ) : (
            <span className="size-1.5 rounded-full bg-primary" />
          )}
          <span className="truncate">{title}</span>
        </a>
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="start"
        sideOffset={6}
        className="w-72 rounded-2xl border border-border bg-surface p-4 shadow-xl text-left"
      >
        <div className="flex flex-col gap-2">
          {category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {category}
            </span>
          )}
          <strong className="text-sm font-medium text-foreground leading-snug">
            {title}
          </strong>
          {description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
