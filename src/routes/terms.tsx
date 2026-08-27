import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { ShieldAlert, BookOpen, Users, Compass } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Lantern-Mind" },
      { name: "description", content: "Terms of Service and Medical Disclaimer." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal & Boundaries"
      title={
        <>
          Terms of <em className="not-italic text-muted-foreground">Service</em>
        </>
      }
      intro="Please read these terms carefully. By using Lantern-Mind, you agree to these boundaries and disclaimers."
    >
      <div className="prose-quiet max-w-4xl rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-14 shadow-xl space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-destructive mb-3">
            <ShieldAlert className="size-3.5" />
            <span>01 · Medical Disclaimer</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Not Therapy or Emergency Care
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Lantern-Mind is an educational and peer-support platform.{" "}
            <strong className="text-foreground">
              It is not a substitute for professional medical advice, clinical diagnosis, or treatment.
            </strong>{" "}
            The content provided—including assessments, trackers, articles, and community stories—is intended for general information and self-pacing only.
          </p>
        </div>

        <div className="border-t border-border/40 pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <Users className="size-3.5" />
            <span>02 · Community Conduct</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Community Safety & Civility
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
            To maintain a sanctuary space, users agree not to:
          </p>
          <ul className="mt-4 space-y-2 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Post content that is abusive, discriminatory, or harassing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Share graphic descriptions of self-harm or violence.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Provide unsolicited clinical diagnoses to peers.</span>
            </li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
