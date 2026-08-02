import { useEffect, useRef, useState } from "react";

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
    <div className="liquid-glass rounded-3xl px-8 py-10 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        One task. Phone in another room.
      </p>
      <p
        className="mt-6 text-6xl tabular-nums tracking-tight text-foreground sm:text-7xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
        aria-live="off"
      >
        {mm}:{ss}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {PRESETS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => select(m)}
            className={`liquid-glass rounded-full px-5 py-2 text-sm transition-transform hover:scale-[1.03] ${
              minutes === m ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {m} min
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="liquid-glass cursor-pointer rounded-full px-10 py-3 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          {running ? "Pause" : remaining === 0 ? "Again" : "Begin"}
        </button>
        <button
          type="button"
          onClick={() => select(minutes)}
          className="rounded-full px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>

      {remaining === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          That was a full block. Five minutes away from every screen now.
        </p>
      ) : null}
    </div>
  );
}
