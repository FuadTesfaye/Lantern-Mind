import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { ShieldCheck, Lock, EyeOff, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lantern-Mind" },
      { name: "description", content: "How we protect and manage your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy & Security"
      title={
        <>
          Privacy <em className="not-italic text-muted-foreground">Policy</em>
        </>
      }
      intro="Your privacy is paramount. This policy explains how we handle your data with care, dignity, and full compliance."
    >
      <div className="prose-quiet max-w-4xl rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-14 shadow-xl space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <Lock className="size-3.5" />
            <span>01 · Local First</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Data Minimization & Local Storage
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
            All interactive assessment instruments on Lantern-Mind (Sleep Diary, Burnout Assessment,
            Recovery Planner, Brain Map) run entirely client-side. <strong>No personal assessment data is ever transmitted to our cloud servers</strong>. All logs stay safely in your device's browser LocalStorage.
          </p>
        </div>

        <div className="border-t border-border/40 pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <EyeOff className="size-3.5" />
            <span>02 · Information Collected</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Minimal Information
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
            If you choose to submit anonymous stories or comments, we collect only the bare essentials needed to prevent spam:
          </p>
          <ul className="mt-4 space-y-2 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span><strong>Pseudonym or Display Name:</strong> We never require your real identity.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span><strong>Submitted Text:</strong> Stories and reflections shared for moderator review.</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-border/40 pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <ShieldCheck className="size-3.5" />
            <span>03 · Zero Data Selling</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Security & Zero Commercial Tracking
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
            We do not use surveillance cookies, ad trackers, or sell data to brokers. Trust is our sole currency. All transmitted API traffic is TLS encrypted.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
