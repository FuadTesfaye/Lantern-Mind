import * as React from "react";
import { Moon, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SleepLog = {
  date: string;
  hours: number;
  quality: 1 | 2 | 3 | 4 | 5;
};

export function SleepDiary() {
  const [logs, setLogs] = React.useState<SleepLog[]>([]);
  const [hours, setHours] = React.useState<number>(7.5);
  const [quality, setQuality] = React.useState<1 | 2 | 3 | 4 | 5>(3);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("lantern-mind-sleep-diary");
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveLog = () => {
    const today = new Date().toISOString().split("T")[0] as string;
    if (logs.some((l) => l.date === today)) {
      alert("You have already logged sleep for today.");
      return;
    }

    const newLog: SleepLog = { date: today, hours, quality };
    const newLogs = [newLog, ...logs].slice(0, 7);
    setLogs(newLogs);
    localStorage.setItem("lantern-mind-sleep-diary", JSON.stringify(newLogs));
  };

  const clearLogs = () => {
    if (confirm("Clear all your sleep logs?")) {
      setLogs([]);
      localStorage.removeItem("lantern-mind-sleep-diary");
    }
  };

  if (!isClient) return null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <Moon className="size-3.5 text-indigo-400" />
            <span>Circadian Log</span>
          </div>
          <h3
            className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Sleep Diary & Quality Tracker
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Track your nightly rest over the last 7 days. Your records stay 100% on this browser.
          </p>
        </div>

        {logs.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearLogs}
            className="text-xs text-muted-foreground hover:text-destructive self-start sm:self-auto gap-1.5"
          >
            <Trash2 className="size-3.5" />
            <span>Clear History</span>
          </Button>
        )}
      </div>

      <div className="grid gap-10 md:grid-cols-2 items-start">
        {/* Input form */}
        <div className="rounded-2xl border border-border/60 bg-background/40 p-6 sm:p-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">
                Hours Slept Last Night
              </label>
              <span className="font-mono text-sm text-primary font-semibold">
                {hours} hrs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Felt Rest Quality (1-5)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuality(q as any)}
                  className={`flex h-11 items-center justify-center rounded-xl border text-sm font-mono font-medium transition-all ${
                    quality === q
                      ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                      : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {q} ★
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={saveLog}
            className="w-full rounded-full py-5 bg-primary text-primary-foreground font-medium hover:opacity-90"
          >
            <span>Log Today's Rest</span>
          </Button>
        </div>

        {/* 7-Day History Chart */}
        <div className="rounded-2xl border border-border/60 bg-background/40 p-6 sm:p-7 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block">
            Recent 7-Day Pattern
          </span>

          {logs.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No entries logged yet. Track your first night above.
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const pct = Math.min(100, Math.round((log.hours / 10) * 100));
                return (
                  <div key={log.date} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-muted-foreground">
                      <span>{log.date}</span>
                      <span className="text-foreground font-medium">
                        {log.hours}h · Quality {log.quality}/5
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface overflow-hidden border border-border/50">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
