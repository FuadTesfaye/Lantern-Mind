import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { taxonomy } from "@/content/taxonomy";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velorah® — You are not broken. You are not alone." },
      {
        name: "description",
        content:
          "Your mind isn’t your enemy. You’re not broken – you’re just overwhelmed. Learn why you feel foggy, anxious or tired, and discover evidence-based ways to recover focus, memory, and motivation.",
      },
      {
        property: "og:title",
        content: "Velorah® — Your mind isn't your enemy.",
      },
      {
        property: "og:description",
        content:
          "Evidence-based tips and support for focus, memory, mood, and meaning. There is a way forward, step by step.",
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
            Your mind isn't your <em className="not-italic text-muted-foreground">enemy.</em> You're not broken – you're just{" "}
            <em className="not-italic text-muted-foreground">overwhelmed.</em>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learn why you feel foggy, anxious or tired, and discover evidence-based ways to recover focus, memory, and motivation.
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
          Your Journey
        </p>
        <h2
          className="mt-6 max-w-3xl text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Evidence-based ways to{" "}
          <em className="not-italic text-muted-foreground">
            rebuild and recover.
          </em>
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {taxonomy.map((category) => (
            <Link
              key={category.slug}
              to="/taxonomy/$slug"
              params={{ slug: category.slug }}
              className="liquid-glass group flex flex-col rounded-3xl px-7 py-8 transition-transform hover:scale-[1.01]"
            >
              <span className="text-xs tracking-[0.28em] text-muted-foreground uppercase">
                {category.name}
              </span>
              <span
                className="mt-6 text-2xl leading-tight tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {category.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="not-italic text-muted-foreground">{category.title.split(" ").slice(-1)[0]}</em>
              </span>
              <span className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {category.summary}
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
            to="/taxonomy/$slug"
            params={{ slug: "rebuild" }}
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
