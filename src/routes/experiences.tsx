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
import { Tilt } from "@/components/unlumen-ui/tilt";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { ClippedCircle } from "@/components/unlumen-ui/clipped-circle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, ShieldAlert, HeartHandshake, Users } from "lucide-react";

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
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6">
        <ReadingToggle />
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {traumaDomains.length} domains · {total} shared experiences
        </p>
      </div>

      {/* Overview Card */}
      <Tilt
        rotationFactor={4}
        className="relative mb-14 rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl"
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-6">
            <Compass className="size-3.5" />
            <span>How This Map Works</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
              <span className="block text-base font-medium text-foreground mb-2">In the Library</span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Each experience connects into an educational guide — what it is, how it touches memory
                and the body, and when to seek help.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
              <span className="block text-base font-medium text-foreground mb-2">In Voices</span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Stories carry up to three soft tags from this list. Click a tag to find others walking a
                similar thread.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
              <span className="block text-base font-medium text-foreground mb-2">In Circles</span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Community spaces gather around themes, not diagnoses — moderated rooms for being
                witnessed, not fixed.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full px-6 bg-primary text-primary-foreground font-medium">
              <Link to="/community">
                <span>Open Voices & Circles</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-border bg-background/60 text-muted-foreground hover:text-foreground">
              <Link to="/taxonomy/$slug" params={{ slug: "understand" }}>
                <span>Back to Understand Yourself</span>
              </Link>
            </Button>
          </div>
        </div>

        <ClippedCircle circleClassName="bg-primary/15" circleSize={650} />
      </Tilt>

      {/* Domain Navigation Pills */}
      <nav aria-label="Experience domains" className="mb-14 flex flex-wrap gap-2">
        {traumaDomains.map((domain) => (
          <a
            key={domain.slug}
            href={`#${domain.slug}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-mono text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground hover:bg-card"
          >
            Domain {domain.letter}: {(domain.name.split("&")[0] || "").trim()}
          </a>
        ))}
      </nav>

      {/* Domains & Experiences */}
      <div className="grid gap-16">
        {traumaDomains.map((domain) => (
          <section key={domain.slug} id={domain.slug} className="scroll-mt-28">
            <div className="mb-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
                <span>Domain {domain.letter}</span>
              </div>
              <h2
                className="text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {domain.name}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {domain.summary}
              </p>
            </div>

            <div className="grid gap-5">
              {domain.experiences.map((exp) => (
                <article
                  key={exp.slug}
                  id={exp.slug}
                  className="group rounded-3xl border border-border bg-surface p-7 sm:p-9 transition-all duration-200 hover:border-foreground/25 hover:shadow-lg"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3
                      className="max-w-2xl text-2xl leading-snug text-foreground sm:text-3xl font-normal group-hover:text-primary transition-colors"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-foreground/5 border border-border/50 px-3 py-1 text-xs font-mono text-muted-foreground">
                        {exp.tag}
                      </span>
                      {exp.sensitive ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-mono text-destructive">
                          <ShieldAlert className="size-3" />
                          <span>Content care</span>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-6 text-xs font-mono uppercase tracking-widest text-primary">
                    What it feels like
                  </p>
                  <p className="prose-quiet mt-2 max-w-3xl text-base leading-relaxed text-foreground/85">
                    {exp.feeling}
                  </p>

                  {exp.sensitive ? (
                    <p className="mt-5 max-w-2xl text-xs leading-relaxed text-muted-foreground border-t border-border/40 pt-4">
                      Heavily moderated on Voices. Stories here carry warnings and a direct path to crisis resources.{" "}
                      <Link
                        to="/reach-us"
                        className="text-primary underline-offset-4 hover:underline font-medium"
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

      {/* Curated Collections */}
      <section className="mt-24 border-t border-border/40 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
          <span>Curated Collections</span>
        </div>
        <h2
          className="max-w-2xl text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Landing pages that merge the category with the{" "}
          <em className="not-italic text-muted-foreground">emotional journey.</em>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {curatedCollections.map((c) => (
            <TiltCard
              key={c.slug}
              title={c.title}
              description={c.description}
              footerSlot={
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-foreground/5 border border-border/40 px-2.5 py-0.5 text-xs font-mono text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </section>

      {/* Support Circles */}
      <section className="mt-24 border-t border-border/40 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
          <Users className="size-3.5" />
          <span>Support Circles</span>
        </div>
        <h2
          className="max-w-2xl text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Themes for gathering —{" "}
          <em className="not-italic text-muted-foreground">not diagnoses.</em>
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Safe, moderated spaces. They are not therapy rooms. The tags help match people who carry
          similar weight.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supportCircles.map((circle) => (
            <TiltCard
              key={circle.slug}
              title={circle.title}
              description={circle.description}
              href="/community"
              footerSlot={
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <span>Enter Circle</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              }
            />
          ))}
        </div>
      </section>

      {/* Safety & Dignity */}
      <section className="mt-24 border-t border-border/40 pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
          <HeartHandshake className="size-3.5" />
          <span>Safety & Dignity</span>
        </div>
        <h2
          className="max-w-2xl text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          How Lantern-Mind stays a <em className="not-italic text-muted-foreground">sanctuary.</em>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {safetyPrinciples.map((p) => (
            <div key={p.title} className="rounded-3xl border border-border bg-surface p-7 sm:p-8">
              <h3 className="text-base font-medium text-foreground mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <CareNote>
          These categories name lived experience — they are not diagnoses, and reading yourself in
          them is not a clinical conclusion. Persistent distress, flashbacks, or thoughts of harm
          deserve a real conversation with a clinician or crisis service. Asking for help is part of
          dignity, not a failure of it.
        </CareNote>
      </div>

      <div className="mt-12 flex flex-wrap gap-4 pb-8">
        <Button asChild className="rounded-full px-8 py-5 bg-primary text-primary-foreground font-medium">
          <Link to="/community">
            <span>Read Voices</span>
            <ArrowRight className="size-4 ml-1.5" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6 py-5 border-border bg-surface text-muted-foreground hover:text-foreground">
          <Link to="/reach-us">
            <span>I need help now</span>
          </Link>
        </Button>
      </div>
    </PageShell>
  );
}
