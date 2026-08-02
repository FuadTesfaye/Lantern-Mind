import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { pillars } from "@/content/pillars";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velorah® — You are not broken. You are not alone." },
      {
        name: "description",
        content:
          "A calm, evidence-based path out of brain fog: sleep, attention, memory, meaning and connection. You are not broken, and you are not alone. There is a way forward, step by step.",
      },
      {
        property: "og:title",
        content: "Velorah® — You are not broken. You are not alone.",
      },
      {
        property: "og:description",
        content:
          "A calm, evidence-based path out of brain fog: sleep, attention, memory, meaning and connection. There is a way forward, step by step.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <SiteNav />

        <div className="relative z-10 flex flex-col items-center px-6 py-[90px] pb-40 pt-32 text-center">
          <h1
            className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            You are <em className="not-italic text-muted-foreground">not broken.</em> You are{" "}
            <em className="not-italic text-muted-foreground">not alone.</em>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            There is a way forward, step by step. We build calm, evidence-based tools and digital spaces to guide you out of brain fog toward focus, memory, and connection.
          </p>

          <Link
            to="/studio"
            className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]"
          >
            Begin Journey
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-28">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Six pillars
        </p>
        <h2
          className="mt-6 max-w-3xl text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          A gentle, evidence-based structure{" "}
          <em className="not-italic text-muted-foreground">
            for your path back to clarity.
          </em>
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              to="/pillars/$slug"
              params={{ slug: pillar.slug }}
              className="liquid-glass group flex flex-col rounded-3xl px-7 py-8 transition-transform hover:scale-[1.01]"
            >
              <span className="text-xs tracking-[0.28em] text-muted-foreground">
                {pillar.numeral}
              </span>
              <span
                className="mt-6 text-2xl leading-tight tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {pillar.title}{" "}
                <em className="not-italic text-muted-foreground">{pillar.em}</em>
              </span>
              <span className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {pillar.summary}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 pb-10">
        <div className="liquid-glass flex flex-col items-start gap-8 rounded-3xl px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2
            className="max-w-xl text-3xl font-normal leading-[1.05] tracking-[-1.2px] sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Start with one night of sleep.{" "}
            <em className="not-italic text-muted-foreground">
              The rest can wait until morning.
            </em>
          </h2>
          <Link
            to="/pillars/$slug"
            params={{ slug: "body" }}
            className="liquid-glass shrink-0 cursor-pointer rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
          >
            Begin here
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
