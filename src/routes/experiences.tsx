import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { ReadingToggle } from "@/components/reading-toggle";
import {
  curatedCollections,
  safetyPrinciples,
  supportCircles,
  traumaDomains,
  traumaIntro,
} from "@/content/trauma";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Lived Experiences — Lantern-Mind" },
      {
        name: "description",
        content:
          "A detailed map of trauma and lived experiences — named with felt sense, not clinical labels — so you can find the words for what happened.",
      },
      { property: "og:title", content: "Lived Experiences — Lantern-Mind" },
      {
        property: "og:description",
        content:
          "Shared human experiences that fracture memory, attention, and identity — written so you can stop wondering if you’re alone.",
      },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const total = traumaDomains.reduce((n, d) => n + d.experiences.length, 0);

  return (
    <PageShell
      eyebrow={traumaIntro.eyebrow}
      title={
        <>
          {traumaIntro.titleLead}{" "}
          <em className="not-italic text-muted-foreground">{traumaIntro.titleEm}</em>
        </>
      }
      intro={traumaIntro.body}
    >
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <ReadingToggle />
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {traumaDomains.length} domains · {total} experiences
        </p>
      </div>

      <div className="liquid-glass mb-14 rounded-3xl px-8 py-8 md:px-12 md:py-10">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          How this map works
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="block text-foreground/90">In the Library</span>
            Each experience can grow into an educational guide — what it is, how it touches memory
            and the body, and when to seek help.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="block text-foreground/90">In Voices</span>
            Stories carry up to three soft tags from this list. Click a tag to find others walking a
            similar thread.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="block text-foreground/90">In Circles</span>
            Community spaces gather around themes, not diagnoses — moderated rooms for being
            witnessed, not fixed.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/community"
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
          >
            Open Voices & Circles
          </Link>
          <Link
            to="/taxonomy/$slug"
            params={{ slug: "understand" }}
            className="rounded-full px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to Understand Yourself
          </Link>
        </div>
      </div>

      <nav aria-label="Experience domains" className="mb-16 flex flex-wrap gap-2">
        {traumaDomains.map((domain) => (
          <a
            key={domain.slug}
            href={`#${domain.slug}`}
            className="rounded-full border border-border/50 px-4 py-2 text-xs tracking-wide text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            {domain.letter}. {(domain.name.split("&")[0] || "").trim()}
          </a>
        ))}
      </nav>

      <div className="grid gap-16">
        {traumaDomains.map((domain) => (
          <section key={domain.slug} id={domain.slug} className="scroll-mt-28">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Domain {domain.letter}
              </p>
              <h2
                className="mt-4 text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {domain.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {domain.summary}
              </p>
            </div>

            <div className="grid gap-4">
              {domain.experiences.map((exp) => (
                <article
                  key={exp.slug}
                  id={exp.slug}
                  className="liquid-glass scroll-mt-28 rounded-3xl px-7 py-8 md:px-10 md:py-10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3
                      className="max-w-2xl text-2xl leading-snug tracking-[-0.5px] text-foreground sm:text-3xl"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">
                        {exp.tag}
                      </span>
                      {exp.sensitive ? (
                        <span className="rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1 text-xs text-destructive/80">
                          Content care
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    What it feels like
                  </p>
                  <p className="prose-quiet mt-3 max-w-2xl text-base leading-loose text-foreground/90">
                    {exp.feeling}
                  </p>
                  {exp.sensitive ? (
                    <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      Heavily moderated on Voices. Stories here carry warnings and a path to crisis
                      resources.{" "}
                      <Link
                        to="/reach-us"
                        className="text-foreground/80 underline-offset-4 hover:underline"
                      >
                        I need help now
                      </Link>
                      .
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Curated collections
        </p>
        <h2
          className="mt-4 max-w-2xl text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Landing pages that merge the category with the{" "}
          <em className="not-italic text-muted-foreground">emotional journey.</em>
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {curatedCollections.map((c) => (
            <div key={c.slug} className="liquid-glass rounded-3xl px-7 py-8">
              <h3
                className="text-xl leading-snug text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Support Circles</p>
        <h2
          className="mt-4 max-w-2xl text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Themes for gathering —{" "}
          <em className="not-italic text-muted-foreground">not diagnoses.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Safe, moderated spaces. They are not therapy rooms. The tags help match people who carry
          similar weight.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportCircles.map((circle) => (
            <Link
              key={circle.slug}
              to="/community"
              hash="circles"
              className="liquid-glass rounded-3xl px-6 py-7 transition-transform hover:scale-[1.01]"
            >
              <h3
                className="text-xl text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {circle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {circle.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Safety & dignity
        </p>
        <h2
          className="mt-4 max-w-2xl text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          How Lantern-Mind stays a <em className="not-italic text-muted-foreground">sanctuary.</em>
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {safetyPrinciples.map((p) => (
            <div key={p.title} className="liquid-glass rounded-3xl px-7 py-8">
              <h3 className="text-sm font-medium tracking-wide text-foreground/90">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CareNote>
        These categories name lived experience — they are not diagnoses, and reading yourself in
        them is not a clinical conclusion. Persistent distress, flashbacks, or thoughts of harm
        deserve a real conversation with a clinician or crisis service. Asking for help is part of
        dignity, not a failure of it.
      </CareNote>

      <div className="mt-12 flex flex-wrap gap-4 pb-8">
        <Link
          to="/community"
          className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Read Voices
        </Link>
        <Link
          to="/reach-us"
          className="rounded-full px-6 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          I need help now
        </Link>
      </div>
    </PageShell>
  );
}
