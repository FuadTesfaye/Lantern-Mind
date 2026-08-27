"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ClippedCircle } from "./clipped-circle";
import { Tilt, type TiltProps } from "./tilt";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** left half of the split badge pill; shown as a simple pill if `badgeLabel` is omitted */
  price?: string;
  /** right half of the split pill, coloured by `badgeVariant` */
  badgeLabel?: string;
  badgeVariant?: "success" | "warning" | "primary" | "neutral";
  imageSrc?: string;
  imageAlt?: string;
  /** wraps the card in a plain `<a>` tag or Link */
  href?: string;
  children?: React.ReactNode;
  tiltProps?: Omit<TiltProps, "children" | "className">;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
}

const BADGE_LABEL_CLASSES: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  primary: "bg-primary/15 text-primary border-primary/30",
  neutral: "bg-foreground/10 text-foreground/80 border-border/50",
};

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  headerSlot,
  footerSlot,
  className,
  ...props
}: TiltCardProps) {
  const inner = (
    <Tilt
      rotationFactor={8}
      {...tiltProps}
      className={cn(
        "relative group overflow-hidden",
        "bg-surface border border-border rounded-2xl",
        "flex flex-col justify-between",
        "p-6 sm:p-7 w-full",
        "hover:border-foreground/20 hover:shadow-xl transition-all duration-300 ease-out",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col gap-3">
        {headerSlot ? (
          headerSlot
        ) : (price || badgeLabel) ? (
          <div className="flex items-center justify-between gap-2 mb-1">
            {price && badgeLabel ? (
              <div className="inline-flex h-fit items-center text-xs whitespace-nowrap shrink-0 border border-border/60 rounded-full overflow-hidden">
                <span className="bg-foreground/5 text-foreground/80 h-fit py-0.5 px-2.5 font-medium">
                  {price}
                </span>
                <span
                  className={cn(
                    "text-xs h-fit py-0.5 px-2.5 font-medium border-l border-border/40",
                    BADGE_LABEL_CLASSES[badgeVariant],
                  )}
                >
                  {badgeLabel}
                </span>
              </div>
            ) : price ? (
              <span className="h-fit rounded-full bg-foreground/10 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-foreground/80 whitespace-nowrap shrink-0">
                {price}
              </span>
            ) : null}
          </div>
        ) : null}

        {title && (
          <div className="text-xl sm:text-2xl font-normal leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
            {title}
          </div>
        )}

        {description && (
          <div className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}

        {children && <div className="mt-2">{children}</div>}
      </div>

      {footerSlot && (
        <div className="relative z-10 mt-6 pt-4 border-t border-border/40">
          {footerSlot}
        </div>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          width={288}
          height={224}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute z-0 top-24 w-72 -right-8 opacity-40",
            "rotate-[-6deg] border border-border rounded-lg shadow-md",
            "transition-transform duration-300 ease-out",
            "group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:opacity-70",
          )}
        />
      )}

      <ClippedCircle circleClassName="bg-primary/25" circleSize={600} />
    </Tilt>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block cursor-pointer focus-visible:outline-none"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return <div {...props}>{inner}</div>;
}
