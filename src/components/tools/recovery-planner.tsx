import * as React from "react";
import { Link } from "@tanstack/react-router";

export function RecoveryPlanner() {
  const [step, setStep] = React.useState(0);
  const [inputs, setInputs] = React.useState({
    primaryStruggle: "", // burnout, trauma, adhd, fog
    sleepHours: 7,
    stressLevel: 5,
    exercised: "no",
  });
  const [showPlan, setShowPlan] = React.useState(false);

  const handleNext = () => setStep((s) => s + 1);

  const generatePlan = () => {
    setShowPlan(true);
  };

  const plan = React.useMemo(() => {
    const tasks = [];
    // Sleep logic
    if (inputs.sleepHours < 7) {
      tasks.push({
        time: "Tonight (8:00 PM)",
        title: "Early Lights Out",
        desc: "You slept less than 7 hours. Aim for lights out at 9:30 PM. No screens 1 hour before.",
        faith:
          "Read Ayat al-Kursi and the last two ayats of Surah Al-Baqarah for protection and peace.",
      });
    }

    // Stress logic
    if (inputs.stressLevel > 6) {
      tasks.push({
        time: "Afternoon Break",
        title: "Regulate Nervous System",
        desc: "Your stress is high. Take a 10-minute break for box breathing or a short walk outside.",
        faith: "Use this time for Dhikr (remembrance) to actively lower your heart rate.",
      });
    }

    // Exercise logic
    if (inputs.exercised === "no") {
      tasks.push({
        time: "Morning (or Lunch)",
        title: "Gentle Movement",
        desc: "A 20-minute brisk walk. This boosts BDNF in the brain, fighting brain fog.",
      });
    }

    // Primary struggle logic
    if (inputs.primaryStruggle === "burnout") {
      tasks.push({
        time: "Workday End",
        title: "Hard Boundary",
        desc: "Close laptop at a strict time. Write down tomorrow's tasks so they leave your mind.",
      });
    } else if (inputs.primaryStruggle === "adhd") {
      tasks.push({
        time: "Focus Blocks",
        title: "Pomodoro Sprints",
        desc: "Break today's main task into 25-minute sprints. Do not rely on willpower.",
      });
    } else if (inputs.primaryStruggle === "trauma") {
      tasks.push({
        time: "Anytime",
        title: "Grounding Exercise",
        desc: "Practice the 5-4-3-2-1 sensory method if you feel overwhelmed or disconnected.",
      });
    }

    // Universal
    tasks.push({
      time: "Evening",
      title: "Gratitude Journal",
      desc: "Write down 3 specific things you are grateful for today.",
      faith: "Reflect on Shukr (gratitude) as a way to reframe your trials.",
    });

    return tasks.sort((a, b) => a.time.localeCompare(b.time));
  }, [inputs]);

  return (
    <div className="liquid-glass overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3
            className="text-2xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            My Recovery Planner
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A small wizard to generate your evidence-based daily structure.
          </p>
        </div>
      </div>

      {!showPlan ? (
        <div className="space-y-8">
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="text-sm font-medium text-foreground/90">
                What is your primary struggle right now?
              </label>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { id: "burnout", label: "Burnout / Exhaustion" },
                  { id: "fog", label: "Brain Fog / Poor Memory" },
                  { id: "trauma", label: "Trauma / High Anxiety" },
                  { id: "adhd", label: "ADHD / Focus Loss" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setInputs({ ...inputs, primaryStruggle: opt.id })}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      inputs.primaryStruggle === opt.id
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={!inputs.primaryStruggle}
                className="liquid-glass mt-8 rounded-full px-8 py-3 text-sm text-foreground disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6 duration-500">
              <div>
                <label className="text-sm font-medium text-foreground/90">
                  How many hours did you sleep last night?
                </label>
                <div className="mt-4 flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.5"
                    value={inputs.sleepHours}
                    onChange={(e) =>
                      setInputs({ ...inputs, sleepHours: parseFloat(e.target.value) })
                    }
                    className="flex-1 accent-[var(--color-primary)]"
                  />
                  <span className="w-12 text-sm text-muted-foreground">{inputs.sleepHours}h</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/90">
                  Current Stress Level (1 = Calm, 10 = Overwhelmed)
                </label>
                <div className="mt-4 flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={inputs.stressLevel}
                    onChange={(e) =>
                      setInputs({ ...inputs, stressLevel: parseInt(e.target.value) })
                    }
                    className="flex-1 accent-destructive"
                  />
                  <span className="w-12 text-sm text-muted-foreground">
                    {inputs.stressLevel}/10
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/90">
                  Have you exercised in the past 2 days?
                </label>
                <div className="mt-4 flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setInputs({ ...inputs, exercised: opt })}
                      className={`flex-1 rounded-full border py-2 text-sm uppercase transition-colors ${
                        inputs.exercised === opt
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-primary"
                          : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(0)}
                  className="rounded-full px-6 py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  Back
                </button>
                <button
                  onClick={generatePlan}
                  className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground transition-transform hover:scale-[1.03]"
                >
                  Generate My Plan
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-6 rounded-2xl bg-[var(--color-primary)]/10 p-6 text-primary">
            <p className="text-sm">
              Your plan is ready. Focus on consistency, not perfection. If you miss a task, just
              pick it up tomorrow.
            </p>
          </div>

          <div className="space-y-4">
            {plan.map((task, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-2xl border border-border/40 bg-foreground/5 p-6"
              >
                <div className="mt-1 h-5 w-5 shrink-0 rounded border border-muted-foreground/40" />
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    {task.time}
                  </p>
                  <p className="mt-1 font-medium text-foreground/90">{task.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{task.desc}</p>
                  {task.faith && (
                    <p className="mt-3 border-l-2 border-[var(--color-primary)]/30 pl-3 text-xs italic text-[var(--color-primary)]/80">
                      {task.faith}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                setStep(0);
                setShowPlan(false);
              }}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
