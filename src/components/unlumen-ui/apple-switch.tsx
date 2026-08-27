"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const switchSizes = {
  sm: {
    trackX: 44,
    trackY: 24,
    thumbX: 18,
    thumbY: 18,
    padding: 3,
  },
  md: {
    trackX: 56,
    trackY: 28,
    thumbX: 22,
    thumbY: 22,
    padding: 3,
  },
  lg: {
    trackX: 68,
    trackY: 34,
    thumbX: 28,
    thumbY: 28,
    padding: 3,
  },
} as const;

const thumbSpring = {
  stiffness: 700,
  damping: 48,
  mass: 0.55,
};

export interface AppleSwitchProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onChange" | "role"
  > {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: keyof typeof switchSizes;
  labelSide?: "left" | "right";
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const AppleSwitch = forwardRef<HTMLButtonElement, AppleSwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      label,
      description,
      size = "md",
      labelSide = "right",
      className,
      style,
      disabled,
      defaultChecked,
      id,
      type = "button",
      onClick,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      Boolean(defaultChecked),
    );
    const currentChecked = checked ?? uncontrolledChecked;
    const metrics = switchSizes[size];
    const thumbTravel = metrics.trackX - metrics.thumbX - metrics.padding * 2;
    const targetX = useMotionValue(currentChecked ? thumbTravel : 0);
    const thumbX = useSpring(targetX, thumbSpring);

    useEffect(() => {
      targetX.set(currentChecked ? thumbTravel : 0);
    }, [currentChecked, thumbTravel, targetX]);

    const setChecked = (next: boolean) => {
      if (checked === undefined) {
        setUncontrolledChecked(next);
      }
      targetX.set(next ? thumbTravel : 0);
      onCheckedChange?.(next);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      setChecked(!currentChecked);
    };

    const switchEl = (
      <button
        id={switchId}
        ref={ref}
        type={type}
        role="switch"
        aria-checked={currentChecked}
        disabled={disabled}
        onClick={handleClick}
        aria-label={typeof label === "string" ? label : undefined}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
          "border border-border/80 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          currentChecked ? "bg-primary" : "bg-foreground/10",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={{
          width: metrics.trackX,
          height: metrics.trackY,
          ...style,
        }}
        {...props}
      >
        <motion.span
          className="pointer-events-none z-10 block rounded-full bg-background shadow-md border border-border/50"
          style={{
            width: metrics.thumbX,
            height: metrics.thumbY,
            x: thumbX,
            marginLeft: metrics.padding,
          }}
        />
      </button>
    );

    if (!label) return switchEl;

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "inline-flex cursor-pointer select-none items-center gap-3",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {labelSide === "left" && (
          <span className="flex flex-col gap-0.5 text-right">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        )}
        {switchEl}
        {labelSide === "right" && (
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);

AppleSwitch.displayName = "AppleSwitch";
