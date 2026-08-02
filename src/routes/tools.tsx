import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { BurnoutQuiz } from "@/components/tools/burnout-quiz";
import { SleepDiary } from "@/components/tools/sleep-diary";
import { FocusTimer } from "@/components/focus-timer";
import { BrainMapInteractive } from "@/components/tools/brain-map";
import { RecoveryPlanner } from "@/components/tools/recovery-planner";

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

function ToolsPage() {
  return (
    <PageShell
      eyebrow="Interactive Tools"
      title={
        <>
          Small instruments for <em className="not-italic text-muted-foreground">the long walk.</em>
        </>
      }
      intro="None of these are clever. They exist so that the work has somewhere to happen. Use one; ignore the rest until you need them. All data stays locally on your device."
    >
      <div className="grid gap-10">
        <section id="brain-map">
          <BrainMapInteractive />
        </section>

        <section id="recovery-planner">
          <RecoveryPlanner />
        </section>

        <section id="burnout-assessment">
          <BurnoutQuiz />
        </section>

        <section id="sleep-diary">
          <SleepDiary />
        </section>

        <section id="focus-timer">
          <FocusTimer />
        </section>
      </div>

      <CareNote />
    </PageShell>
  );
}
