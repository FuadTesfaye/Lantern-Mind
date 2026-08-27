import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { taxonomy } from "@/content/taxonomy";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { ClippedCircle } from "@/components/unlumen-ui/clipped-circle";
import { ArrowRight, Compass, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "The Studio — Lantern-Mind's Library of Clarity" },
      {
        name: "description",
        content:
          "The full framework: understand what's happening, rebuild the body, structure the day, and navigate your emotions.",
      },
      { property: "og:title", content: "The Studio — Lantern-Mind's Library of Clarity" },
      {
        property: "og:description",
        content:
          "A structured, compassionate path out of brain fog, which you can walk one step at a time.",
      },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <PageShell
      eyebrow="The Studio"
      title={
        <>
          A path you can walk{" "}
          <em className="not-italic text-muted-foreground">one step at a time.</em>
        </>
      }
      intro="Explore our library of evidence-based resources. Each section is written to help you understand your mind, rebuild your body, and navigate your daily life."
    >
      {/* Featured Atlas Banner */}
      <Tilt
        rotationFactor={5}
        className="group relative mb-8 overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl hover:border-foreground/30 transition-all duration-300"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/15 border border-primary/30 px-3 py-0.5 text-xs text-primary font-mono font-medium">
                MAP · ATLAS
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                6 Domains · Shared Trauma
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Lived Experiences <em className="not-italic text-muted-foreground">atlas.</em>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              A detailed map of trauma and shared human wounds — named with felt sense, not clinical
              boxes — so visitors can find the words they never had.
            </p>
          </div>

          <Button asChild className="rounded-full px-6 py-5 bg-primary text-primary-foreground hover:opacity-90 font-medium shrink-0 self-start md:self-auto">
            <Link to="/experiences">
              <span>Open Atlas</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <ClippedCircle circleClassName="bg-primary/20" circleSize={600} />
      </Tilt>

      {/* Structured Taxonomy Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {taxonomy.map((category, idx) => (
          <TiltCard
            key={category.slug}
            price={`0${idx + 1}`}
            badgeLabel={`${category.topics.length} topics`}
            badgeVariant="neutral"
            title={
              <span>
                {category.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="not-italic text-muted-foreground">
                  {category.title.split(" ").slice(-1)[0]}
                </em>
              </span>
            }
            description={category.summary}
            footerSlot={
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  {category.topics.length} comprehensive guides
                </span>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="px-3 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <Link to="/taxonomy/$slug" params={{ slug: category.slug }}>
                    <span>Explore Section</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            }
          />
        ))}
      </div>

      <div className="mt-16">
        <CareNote />
      </div>
    </PageShell>
  );
}
