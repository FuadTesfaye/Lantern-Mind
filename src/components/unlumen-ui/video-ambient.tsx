"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoAmbientProps {
  src: string;
  poster?: string;
  blurAmount?: number;
  intensity?: number;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

const CANVAS_W = 64;
const CANVAS_H = 36;

export function VideoAmbient({
  src,
  poster,
  blurAmount = 60,
  intensity = 0.65,
  autoPlay = false,
  muted = false,
  className,
}: VideoAmbientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!video.paused || video.readyState >= 2) {
        try {
          ctx.drawImage(video, 0, 0, CANVAS_W, CANVAS_H);
        } catch {
          // Ignore cross-origin issues
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={cn("relative w-full overflow-visible", className)}>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        aria-hidden
        className="absolute pointer-events-none rounded-2xl"
        style={{
          inset: 0,
          width: "100%",
          height: "100%",
          filter: `blur(${blurAmount}px)`,
          opacity: intensity,
          transform: "scale(1.06)",
          zIndex: 0,
        }}
      />
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={muted}
        className="relative w-full rounded-2xl border border-border/80 shadow-2xl"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}
