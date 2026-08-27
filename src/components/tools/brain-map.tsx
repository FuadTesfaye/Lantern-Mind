import * as React from "react";
import { BrainCircuit, Info, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type BrainRegion = {
  id: string;
  name: string;
  role: string;
  stressEffect: string;
  path: string;
  cx: string;
  cy: string;
};

const regions: BrainRegion[] = [
  {
    id: "prefrontal-cortex",
    name: "Prefrontal Cortex",
    role: "Responsible for complex decision making, focus, working memory, and emotional regulation. It is the 'conductor' of the mind.",
    stressEffect:
      "Chronic stress and cortisol surge thin dendritic connections here, leading to brain fog, executive exhaustion, and difficulty prioritizing.",
    path: "M 20 60 Q 30 10 90 20 Q 95 60 70 90 Q 30 100 20 60 Z",
    cx: "50",
    cy: "50",
  },
  {
    id: "amygdala",
    name: "Amygdala",
    role: "The brain's threat radar. It scans sensory input and triggers autonomic fight, flight, or freeze responses.",
    stressEffect:
      "Prolonged trauma and burnout can cause the amygdala to become hyper-sensitized, triggering false alarms and hyperarousal even in safe moments.",
    path: "M 100 110 A 15 15 0 1 1 130 110 A 15 15 0 1 1 100 110 Z",
    cx: "115",
    cy: "110",
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    role: "Critical for contextual learning, memory consolidation, and regulating cortisol feedback loops.",
    stressEffect:
      "Sustained neuro-inflammation and cortisol inhibit neurogenesis here, creating lapses in short-term recall and time disorientation.",
    path: "M 130 110 Q 150 130 160 110 Q 140 90 130 110 Z",
    cx: "145",
    cy: "110",
  },
];

export function BrainMapInteractive() {
  const [activeRegion, setActiveRegion] = React.useState<string>("prefrontal-cortex");

  const selected = regions.find((r) => r.id === activeRegion) || regions[0];

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <BrainCircuit className="size-3.5" />
            <span>Interactive Atlas</span>
          </div>
          <h3
            className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Brain & Nervous System Map
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Select highlighted brain regions to explore how stress, exhaustion, and recovery shape your neurology.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
            Neuroscience Grounded
          </span>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 items-center">
        {/* Brain SVG Container */}
        <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
          <svg
            viewBox="0 0 200 180"
            className="h-full w-full opacity-90 drop-shadow-md select-none"
          >
            {/* Outline of full brain */}
            <path
              d="M 20 60 Q 30 10 100 10 Q 170 10 180 60 Q 190 120 150 160 Q 100 180 50 160 Q 10 120 20 60 Z"
              fill="currentColor"
              className="text-muted/40"
            />
            {/* Cerebellum Outline */}
            <path
              d="M 120 150 Q 150 140 160 170 Q 120 180 120 150 Z"
              fill="currentColor"
              className="text-muted/30"
            />

            {/* Interactive Regions */}
            {regions.map((r) => {
              const isActive = activeRegion === r.id;
              return (
                <g
                  key={r.id}
                  onClick={() => setActiveRegion(r.id)}
                  className="cursor-pointer group"
                >
                  <path
                    d={r.path}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "fill-[var(--color-primary)] opacity-90"
                        : "fill-[var(--color-primary)] opacity-25 group-hover:opacity-60"
                    }`}
                  />
                  {/* Hotspot indicator */}
                  <circle
                    cx={r.cx}
                    cy={r.cy}
                    r={isActive ? "5" : "3.5"}
                    className="fill-foreground transition-all duration-300"
                  />
                  {isActive && (
                    <circle
                      cx={r.cx}
                      cy={r.cy}
                      r="9"
                      className="fill-none stroke-primary stroke-[1.5] animate-ping opacity-75 origin-center"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-muted-foreground">
            Tap a node to explore
          </div>
        </div>

        {/* Region Details Panel */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-wrap gap-2 mb-6">
            {regions.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRegion(r.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                  activeRegion === r.id
                    ? "border-primary bg-primary/15 text-primary font-semibold shadow-xs"
                    : "border-border bg-background/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-border/80 bg-background/60 p-6 sm:p-7 space-y-5"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary">
                  Selected Region
                </span>
                <h4
                  className="mt-1 text-2xl text-foreground font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {selected.name}
                </h4>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Primary Function
                </span>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {selected.role}
                </p>
              </div>

              <div className="border-t border-border/40 pt-4">
                <span className="block text-xs font-mono uppercase tracking-wider text-rose-400 mb-1">
                  Effect of Burnout & Stress
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selected.stressEffect}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
