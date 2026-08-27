import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { ClippedCircle } from "@/components/unlumen-ui/clipped-circle";
import { Button } from "@/components/ui/button";
import { ShieldCheck, HeartHandshake, Sparkles, ArrowRight, Lock, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Lantern-Mind — a lantern for people lost in the fog" },
      {
        name: "description",
        content:
          "Why Lantern-Mind exists, how it is written, and what it promises: no quick fixes, no toxic positivity, no gatekeeping of anything essential.",
      },
      { property: "og:title", content: "About Lantern-Mind" },
      {
        property: "og:description",
        content:
          "No quick fixes, no toxic positivity, no gatekeeping. Evidence-based education written like a kind mentor who walked the path.",
      },
    ],
  }),
  component: AboutPage,
});

const promises = [
  {
    title: "No quick fixes",
    body: "Nothing here promises a week to a new brain. Recovery is slow, unglamorous and mostly made of sleep. Anyone telling you otherwise is selling something.",
    badge: "Patience",
    icon: <Sparkles className="size-4 text-primary" />,
  },
  {
    title: "No toxic positivity",
    body: "You will not be told to be grateful for your exhaustion. Difficulty is described accurately, because being described accurately is the first relief.",
    badge: "Honesty",
    icon: <HeartHandshake className="size-4 text-primary" />,
  },
  {
    title: "A clear line around help",
    body: "Every section separates what you can do yourself from what needs a doctor or a therapist. Escalation is written into the advice, not tacked onto the end.",
    badge: "Safety",
    icon: <ShieldCheck className="size-4 text-primary" />,
  },
  {
    title: "No data sold, ever",
    body: "There is nothing to log in to and nothing to harvest. All assessments run locally. Trust is the only asset a place like this has.",
    badge: "Zero Tracking",
    icon: <Lock className="size-4 text-primary" />,
  },
  {
    title: "Nothing essential behind a wall",
    body: "If something on this site would help someone at their worst moment, it will always be free to read and accessible without barriers.",
    badge: "Open Access",
    icon: <BookOpen className="size-4 text-primary" />,
  },
];

function AboutPage() {
  return (
    <PageShell
      eyebrow="Our Origins"
      title={
        <>
          A lantern for people{" "}
          <em className="not-italic text-muted-foreground">lost in the fog.</em>
        </>
      }
      intro="Lantern-Mind began as one person's attempt to understand why their own mind had gone quiet — why numbers slipped, why a page of a book felt like a mountain, why the memory of being sharp felt like it belonged to someone else."
    >
      {/* Origin Story Spotlight */}
      <Tilt
        rotationFactor={4}
        className="relative mb-16 rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-14 shadow-xl"
      >
        <div className="relative z-10 max-w-3xl space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
          <p>
            What followed was months of reading — sleep science, working memory, stress physiology,
            habit formation — and then, slowly, of practice. Five pages a day. A fixed wake time.
            Ten minutes of morning sunlight. Sums done in the head at the supermarket. Prayer treated as an
            anchor rather than an obligation.
          </p>
          <p>
            The fog thinned. Not because of one thing, and never all at once, but because a body
            that sleeps and moves and is spoken to kindly begins, in time, to work again.
          </p>
          <p>
            This site is that path written down. The voice is meant to be a mentor's: factual but
            gentle, never hurried, never assuming you have energy you do not have. Every claim is
            kept close to the evidence, and where the evidence is thin, it says so.
          </p>
          <p className="text-xl font-normal text-foreground pt-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            You are not broken. You are not alone. There is a way forward, step by step.
          </p>
        </div>

        <ClippedCircle circleClassName="bg-primary/20" circleSize={700} />
      </Tilt>

      {/* Promises Grid */}
      <div className="mt-20 border-t border-border/40 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
          <ShieldCheck className="size-3.5" />
          <span>Core Commitments</span>
        </div>
        <h2
          className="text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          What this place promises{" "}
          <em className="not-italic text-muted-foreground">and will not break.</em>
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => (
            <TiltCard
              key={p.title}
              badgeLabel={p.badge}
              badgeVariant="primary"
              title={p.title}
              description={p.body}
              headerSlot={
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-xl bg-foreground/5 border border-border/40 p-2.5">
                    {p.icon}
                  </div>
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-mono text-primary">
                    {p.badge}
                  </span>
                </div>
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Button asChild className="rounded-full px-8 py-5 bg-primary text-primary-foreground font-medium">
          <Link to="/studio">
            <span>Begin Journey</span>
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </div>
    </PageShell>
  );
}
