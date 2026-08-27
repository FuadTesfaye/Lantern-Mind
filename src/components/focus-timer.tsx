import { useEffect, useRef, useState } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

const PRESETS = [25, 15, 5];

export function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const select = (m: number) => {
    setRunning(false);
    setMinutes(m);
    setRemaining(m * 60);
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-14 text-center shadow-xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-6">
        <Timer className="size-3.5" />
        <span>Low-Pressure Sprint</span>
      </div>

      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        One task. Phone in another room.
      </p>

      <p
        className="mt-6 text-7xl sm:text-8xl tabular-nums tracking-tight text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
        aria-live="off"
      >
        {mm}:{ss}
      </p>

      {/* Presets */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {PRESETS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => select(m)}
            className={`rounded-full border px-5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              minutes === m
                ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                : "border-border bg-background/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {m} min block
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="rounded-full px-8 py-5 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 shadow-md gap-2"
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          <span>{running ? "Pause" : remaining === 0 ? "Repeat Block" : "Begin Sprint"}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => select(minutes)}
          className="rounded-full px-5 py-5 text-sm border-border bg-surface text-muted-foreground hover:text-foreground gap-1.5"
        >
          <RotateCcw className="size-4" />
          <span>Reset</span>
        </Button>
      </div>

      {remaining === 0 ? (
        <p className="mt-6 text-sm text-emerald-400 font-mono">
          Sprint complete. Step away from the screen for 5 minutes now.
        </p>
      ) : null}
    </div>
  );
}
