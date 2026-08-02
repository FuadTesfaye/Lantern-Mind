import * as React from "react";

type SleepLog = {
  date: string;
  hours: number;
  quality: 1 | 2 | 3 | 4 | 5;
};

export function SleepDiary() {
  const [logs, setLogs] = React.useState<SleepLog[]>([]);
  const [hours, setHours] = React.useState<number>(7);
  const [quality, setQuality] = React.useState<1 | 2 | 3 | 4 | 5>(3);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("velorah-sleep-diary");
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
    // Check if already logged today
    if (logs.some((l) => l.date === today)) {
      alert("You have already logged your sleep for today.");
      return;
    }

    const newLog: SleepLog = { date: today, hours, quality };
    const newLogs = [newLog, ...logs].slice(0, 7); // keep last 7 days
    setLogs(newLogs);
    localStorage.setItem("velorah-sleep-diary", JSON.stringify(newLogs));
  };

  const clearLogs = () => {
    if (confirm("Clear all your sleep data?")) {
      setLogs([]);
      localStorage.removeItem("velorah-sleep-diary");
    }
  };

  if (!isClient) return null;

  return (
    <div className="liquid-glass overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3
            className="text-2xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Sleep Diary
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Track your rest over the last 7 days. Your data stays on your device.
          </p>
        </div>
        {logs.length > 0 && (
          <button
            onClick={clearLogs}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear Data
          </button>
        )}
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Input form */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground/90">Hours Slept Last Night</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="flex-1 accent-foreground"
              />
              <span className="w-12 text-sm text-muted-foreground">{hours}h</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/90">Sleep Quality</label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q as any)}
                  className={`flex h-10 flex-1 items-center justify-center rounded-lg border text-sm transition-colors ${
                    quality === q
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/60 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <button
            onClick={saveLog}
            className="liquid-glass w-full rounded-full py-3 text-sm text-foreground transition-transform hover:scale-[1.02]"
          >
            Log Sleep
          </button>
        </div>

        {/* Chart / History */}
        <div>
          <h4 className="mb-4 text-sm font-medium text-foreground/90">Recent Log</h4>
          {logs.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border/60 text-sm text-muted-foreground">
              No entries yet. Log tonight's sleep.
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.date}
                  className="flex items-center justify-between rounded-2xl bg-foreground/5 px-4 py-3 text-sm"
                >
                  <span className="text-muted-foreground">{log.date}</span>
                  <div className="flex items-center gap-4">
                    <span>{log.hours}h</span>
                    <span className="flex gap-1 text-xs text-foreground/40">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < log.quality ? "text-foreground" : ""}>
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
