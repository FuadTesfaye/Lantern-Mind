import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { pillars } from "@/content/pillars";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "The Studio — Velorah's six pillars of clarity" },
      {
        name: "description",
        content:
          "The full framework: understand what's happening, rebuild the body, train the mind, structure the day, deepen connection, and use simple tools.",
      },
      { property: "og:title", content: "The Studio — Velorah's six pillars of clarity" },
      {
        property: "og:description",
        content:
          "A structured, compassionate path out of brain fog, in six pillars you can walk one at a time.",
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
      intro="Six pillars, in order. Each one assumes nothing from the one before it, but they were written to be walked in sequence: name it, repair the body, train the mind, build the day, find people, pick up the tools."
    >
      <div className="grid gap-5">
        {pillars.map((pillar) => (
          <Link
            key={pillar.slug}
            to="/pillars/$slug"
            params={{ slug: pillar.slug }}
            className="liquid-glass grid gap-6 rounded-3xl px-8 py-10 transition-transform hover:scale-[1.005] md:grid-cols-[6rem_1fr] md:px-12"
          >
            <span className="text-sm tracking-[0.28em] text-muted-foreground">
              {pillar.numeral}
            </span>
            <span>
              <span
                className="block text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {pillar.title}{" "}
                <em className="not-italic text-muted-foreground">{pillar.em}</em>
              </span>
              <span className="mt-4 block max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {pillar.summary}
              </span>
              <span className="mt-6 block text-sm text-muted-foreground">
                {pillar.sections.length} chapters
              </span>
            </span>
          </Link>
        ))}
      </div>

      <CareNote />
    </PageShell>
  );
}
