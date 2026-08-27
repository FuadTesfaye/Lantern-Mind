import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { BurnoutQuiz } from "@/components/tools/burnout-quiz";
import { SleepDiary } from "@/components/tools/sleep-diary";
import { FocusTimer } from "@/components/focus-timer";
import { BrainMapInteractive } from "@/components/tools/brain-map";
import { RecoveryPlanner } from "@/components/tools/recovery-planner";
import { BrainCircuit, HeartPulse, Sparkles, Moon, Timer } from "lucide-react";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools & Assessments — Lantern-Mind" },
      {
        name: "description",
        content:
          "Evidence-based tools to help you assess burnout, track your sleep, and train your focus.",
      },
    ],
  }),
  component: ToolsPage,
});

const instruments = [
  { id: "brain-map", label: "Brain Map", icon: <BrainCircuit className="size-3.5" /> },
  { id: "recovery-planner", label: "Daily Planner", icon: <Sparkles className="size-3.5" /> },
  { id: "burnout-assessment", label: "Burnout Quiz", icon: <HeartPulse className="size-3.5" /> },
  { id: "sleep-diary", label: "Sleep Diary", icon: <Moon className="size-3.5" /> },
  { id: "focus-timer", label: "Focus Timer", icon: <Timer className="size-3.5" /> },
];

function ToolsPage() {
  return (
    <PageShell
      eyebrow="Interactive Instruments"
      title={
        <>
          Small instruments for <em className="not-italic text-muted-foreground">the long walk.</em>
        </>
      }
      intro="None of these are clever. They exist so that the work has somewhere to happen. Use one; ignore the rest until you need them. All data stays strictly on your local browser."
    >
      {/* Quick Jump Bar */}
      <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-border/40 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mr-2">
          Jump to:
        </span>
        {instruments.map((inst) => (
          <a
            key={inst.id}
            href={`#${inst.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground hover:bg-card"
          >
            {inst.icon}
            <span>{inst.label}</span>
          </a>
        ))}
      </div>

      <div className="grid gap-12">
        <section id="brain-map" className="scroll-mt-28">
          <BrainMapInteractive />
        </section>

        <section id="recovery-planner" className="scroll-mt-28">
          <RecoveryPlanner />
        </section>

        <section id="burnout-assessment" className="scroll-mt-28">
          <BurnoutQuiz />
        </section>

        <section id="sleep-diary" className="scroll-mt-28">
          <SleepDiary />
        </section>

        <section id="focus-timer" className="scroll-mt-28">
          <FocusTimer />
        </section>
      </div>

      <div className="mt-16">
        <CareNote />
      </div>
    </PageShell>
  );
}
