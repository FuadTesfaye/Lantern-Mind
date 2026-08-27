import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, RotateCcw, Check, Calendar, Moon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecoveryPlanner() {
  const [step, setStep] = React.useState(0);
  const [inputs, setInputs] = React.useState({
    primaryStruggle: "burnout",
    sleepHours: 7,
    stressLevel: 5,
    exercised: "no",
  });
  const [showPlan, setShowPlan] = React.useState(false);

  const plan = React.useMemo(() => {
    const tasks = [];
    if (inputs.sleepHours < 7) {
      tasks.push({
        time: "Tonight (8:30 PM)",
        title: "Early Lights Out Protocol",
        desc: "You logged less than 7 hours of rest. Aim for lights out at 9:30 PM with zero blue-light 60 minutes prior.",
        tag: "Rest Anchor",
      });
    }

    if (inputs.stressLevel > 5) {
      tasks.push({
        time: "Afternoon (2:00 PM)",
        title: "Physiological Sigh & Reset",
        desc: "High nervous arousal detected. Practice 5 rounds of double-inhalation and slow exhalation to downregulate the vagus nerve.",
        tag: "Somatic Grounding",
      });
    }

    if (inputs.exercised === "no") {
      tasks.push({
        time: "Morning / Midday",
        title: "20-Minute Sunlight Walk",
        desc: "Gentle aerobic movement triggers hippocampal BDNF production, accelerating neuro-recovery and mental sharpness.",
        tag: "Circadian Rhythm",
      });
    }

    if (inputs.primaryStruggle === "burnout") {
      tasks.push({
        time: "End of Workday",
        title: "Strict Transition Boundary",
        desc: "Close screens at a firm hour. Write down open loops on paper so the brain stops cycling in background RAM.",
        tag: "Boundary Setting",
      });
    } else if (inputs.primaryStruggle === "adhd") {
      tasks.push({
        time: "Peak Focus Window",
        title: "Low-Pressure Sprint (25m)",
        desc: "Single-task with timer. Do not rely on dopamine surges; simply work on one small friction point.",
        tag: "Attention Pacing",
      });
    } else if (inputs.primaryStruggle === "trauma") {
      tasks.push({
        time: "Throughout Day",
        title: "5-4-3-2-1 Sensory Orientation",
        desc: "Name five things you can see, four you can touch. Remind your body that it is safe in this present room.",
        tag: "Safety Anchor",
      });
    }

    tasks.push({
      time: "Evening Reflection",
      title: "Quiet Gratitude & Log",
      desc: "Record three concrete moments of peace or stability. Reinforce safety in the nervous system before sleep.",
      tag: "Closure",
    });

    return tasks;
  }, [inputs]);

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <Sparkles className="size-3.5" />
            <span>Daily Blueprint</span>
          </div>
          <h3
            className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Daily Recovery Planner
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            A gentle interactive wizard to generate a compassionate, evidence-based daily rhythm.
          </p>
        </div>
      </div>

      {!showPlan ? (
        <div className="space-y-8">
          {/* Step 1: Struggle */}
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6 space-y-4">
            <label className="text-sm font-medium text-foreground">
              1. What is your primary challenge right now?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "burnout", label: "Burnout" },
                { id: "fog", label: "Brain Fog" },
                { id: "trauma", label: "Nervous Strain" },
                { id: "adhd", label: "Attention Overwhelm" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInputs((prev) => ({ ...prev, primaryStruggle: item.id }))}
                  className={`rounded-xl border p-3 text-xs sm:text-sm font-medium transition-all ${
                    inputs.primaryStruggle === item.id
                      ? "border-primary bg-primary/15 text-primary font-semibold"
                      : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Sleep */}
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                2. Hours of sleep last night:
              </label>
              <span className="font-mono text-sm text-primary font-semibold">
                {inputs.sleepHours} hrs
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="11"
              step="0.5"
              value={inputs.sleepHours}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, sleepHours: parseFloat(e.target.value) }))
              }
              className="w-full accent-primary"
            />
          </div>

          {/* Step 3: Stress */}
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                3. Current felt stress level (1 to 10):
              </label>
              <span className="font-mono text-sm text-primary font-semibold">
                {inputs.stressLevel} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={inputs.stressLevel}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, stressLevel: parseInt(e.target.value) }))
              }
              className="w-full accent-primary"
            />
          </div>

          {/* Step 4: Movement */}
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6 space-y-4">
            <label className="text-sm font-medium text-foreground">
              4. Have you had 20+ minutes of physical movement / outdoor air today?
            </label>
            <div className="flex gap-3">
              {[
                { id: "yes", label: "Yes, already moved" },
                { id: "no", label: "Not yet" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInputs((prev) => ({ ...prev, exercised: item.id }))}
                  className={`flex-1 rounded-xl border p-3 text-xs sm:text-sm font-medium transition-all ${
                    inputs.exercised === item.id
                      ? "border-primary bg-primary/15 text-primary font-semibold"
                      : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setShowPlan(true)}
            className="rounded-full px-8 py-5 bg-primary text-primary-foreground font-medium hover:opacity-90"
          >
            <span>Generate Recovery Rhythm</span>
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 space-y-6">
          <div className="flex justify-between items-center border-b border-border/40 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Your Customized Daily Sequence
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPlan(false)}
              className="rounded-full border-border bg-surface text-muted-foreground hover:text-foreground gap-1.5"
            >
              <RotateCcw className="size-3.5" />
              <span>Modify Inputs</span>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {plan.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-background/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-primary font-medium">
                      {item.time}
                    </span>
                    <span className="rounded-full bg-foreground/5 border border-border/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
