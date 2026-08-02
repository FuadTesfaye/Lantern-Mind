import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Velorah — a lantern for people lost in the fog" },
      {
        name: "description",
        content:
          "Why Velorah exists, how it is written, and what it promises: no quick fixes, no toxic positivity, no gatekeeping of anything essential.",
      },
      { property: "og:title", content: "About Velorah" },
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
  },
  {
    title: "No toxic positivity",
    body: "You will not be told to be grateful for your exhaustion. Difficulty is described accurately, because being described accurately is the first relief.",
  },
  {
    title: "A clear line around help",
    body: "Every section separates what you can do yourself from what needs a doctor or a therapist. Escalation is written into the advice, not tacked onto the end.",
  },
  {
    title: "No data sold, ever",
    body: "There is nothing to log in to and nothing to harvest. Trust is the only asset a place like this has.",
  },
  {
    title: "Nothing essential behind a wall",
    body: "If something on this site would help someone at their worst moment, it will always be free to read.",
  },
];

function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={
        <>
          A lantern for people{" "}
          <em className="not-italic text-muted-foreground">lost in the fog.</em>
        </>
      }
      intro="Velorah began as one person's attempt to understand why their own mind had gone quiet — why numbers slipped, why a page of a book felt like a mountain, why the memory of being sharp felt like it belonged to someone else."
    >
      <div className="liquid-glass rounded-3xl px-8 py-12 md:px-14 md:py-16">
        <div className="max-w-2xl space-y-6 text-base leading-loose text-muted-foreground">
          <p>
            What followed was months of reading — sleep science, working memory,
            stress physiology, habit formation — and then, slowly, of practice. Five
            pages a day. A fixed wake time. Ten minutes of sunlight. Sums done in the
            head at the supermarket. Prayer treated as an anchor rather than an
            obligation.
          </p>
          <p>
            The fog thinned. Not because of one thing, and never all at once, but
            because a body that sleeps and moves and is spoken to kindly begins, in
            time, to work again.
          </p>
          <p>
            This site is that path written down. The voice is meant to be a mentor's:
            factual but gentle, never hurried, never assuming you have energy you do
            not have. Every claim is kept close to the evidence, and where the evidence
            is thin, it says so.
          </p>
          <p className="text-foreground/90">
            You are not broken. You are not alone. There is a way forward, step by step.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2
          className="text-3xl leading-tight tracking-[-1px] sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          What this place promises{" "}
          <em className="not-italic text-muted-foreground">and will not break.</em>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {promises.map((p) => (
            <div key={p.title} className="liquid-glass rounded-3xl px-8 py-9">
              <h3
                className="text-2xl tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Link
          to="/studio"
          className="liquid-glass inline-block rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Begin Journey
        </Link>
      </div>
    </PageShell>
  );
}
