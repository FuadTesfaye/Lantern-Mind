import * as React from "react";

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
    role: "Responsible for complex decision making, focus, and emotional regulation. It is the 'CEO' of the brain.",
    stressEffect:
      "Chronic stress and trauma can thin connections here, leading to 'brain fog' and difficulty concentrating.",
    path: "M 20 60 Q 30 10 90 20 Q 95 60 70 90 Q 30 100 20 60 Z",
    cx: "50",
    cy: "50",
  },
  {
    id: "amygdala",
    name: "Amygdala",
    role: "The brain's alarm system. It detects threats and triggers the fight-or-flight response.",
    stressEffect:
      "Trauma can cause the amygdala to become hyperactive, staying 'on' even when you are safe, leading to panic and hyperarousal.",
    path: "M 100 110 A 15 15 0 1 1 130 110 A 15 15 0 1 1 100 110 Z",
    cx: "115",
    cy: "110",
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    role: "Critical for learning and memory consolidation. It helps convert short-term memory to long-term memory.",
    stressEffect:
      "High cortisol levels from chronic stress can actually shrink the hippocampus, causing memory lapses and forgetfulness.",
    path: "M 130 110 Q 150 130 160 110 Q 140 90 130 110 Z",
    cx: "145",
    cy: "110",
  },
];

export function BrainMapInteractive() {
  const [activeRegion, setActiveRegion] = React.useState<string | null>(null);

  const selected = regions.find((r) => r.id === activeRegion);

  return (
    <div className="liquid-glass overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="mb-8">
        <h3
          className="text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Interactive Brain Map
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Click on the highlighted regions to understand how stress, burnout, and trauma affect your
          biology.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Brain SVG Container */}
        <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-border/40 bg-foreground/5 p-8">
          <svg
            viewBox="0 0 200 180"
            className="h-full w-full opacity-90"
            style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.2))" }}
          >
            {/* Outline of full brain (stylized) */}
            <path
              d="M 20 60 Q 30 10 100 10 Q 170 10 180 60 Q 190 120 150 160 Q 100 180 50 160 Q 10 120 20 60 Z"
              fill="currentColor"
              className="text-muted/30"
            />
            {/* Cerebellum Outline */}
            <path
              d="M 120 150 Q 150 140 160 170 Q 120 180 120 150 Z"
              fill="currentColor"
              className="text-muted/20"
            />

            {/* Interactive Regions */}
            {regions.map((r) => (
              <g key={r.id} onClick={() => setActiveRegion(r.id)} className="cursor-pointer group">
                <path
                  d={r.path}
                  className={`transition-colors duration-300 ${
                    activeRegion === r.id
                      ? "fill-[var(--color-primary)] opacity-80"
                      : "fill-[var(--color-primary)] opacity-20 group-hover:opacity-50"
                  }`}
                />
                {/* Hotspot indicator */}
                <circle
                  cx={r.cx}
                  cy={r.cy}
                  r="4"
                  className={`transition-opacity duration-300 ${
                    activeRegion === r.id ? "fill-background" : "fill-foreground opacity-50"
                  }`}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col justify-center">
          {selected ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h4
                className="text-3xl text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {selected.name}
              </h4>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Role in Wellbeing
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{selected.role}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-destructive/80">
                    How Stress Affects It
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {selected.stressEffect}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                Select a brain region on the left to learn more.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
