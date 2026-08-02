import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { FocusTimer } from "@/components/focus-timer";
import { ReadingToggle } from "@/components/reading-toggle";
import { getPillar, pillars, type Pillar } from "@/content/pillars";

export const Route = createFileRoute("/pillars/$slug")({
  loader: ({ params }) => {
    const pillar = getPillar(params.slug);
    if (!pillar) throw notFound();
    return { pillar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Velorah" }, { name: "robots", content: "noindex" }],
      };
    }
    const { pillar } = loaderData;
    const title = `${pillar.title} ${pillar.em} — Velorah`;
    return {
      meta: [
        { title },
        { name: "description", content: pillar.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: pillar.summary },
      ],
    };
  },
  component: PillarPage,
  notFoundComponent: PillarNotFound,
});

function PillarNotFound() {
  return (
    <PageShell
      title={
        <>
          That chapter{" "}
          <em className="not-italic text-muted-foreground">isn't written yet.</em>
        </>
      }
      intro="The pillar you were looking for doesn't exist. The six that do are waiting in the Studio."
    >
      <Link
        to="/studio"
        className="liquid-glass inline-block rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
      >
        Back to the Studio
      </Link>
    </PageShell>
  );
}

function PillarPage() {
  const { pillar } = Route.useLoaderData() as { pillar: Pillar };
  const index = pillars.findIndex((p) => p.slug === pillar.slug);
  const next = pillars[index + 1];

  return (
    <PageShell
      eyebrow={`Pillar ${pillar.numeral} — ${pillar.name}`}
      title={
        <>
          {pillar.title} <em className="not-italic text-muted-foreground">{pillar.em}</em>
        </>
      }
      intro={pillar.intro}
    >
      <div className="mb-12">
        <ReadingToggle />
      </div>

      <div className="grid gap-5">
        {pillar.sections.map((section) => (
          <article
            key={section.title}
            className="liquid-glass rounded-3xl px-8 py-10 md:px-12 md:py-14"
          >
            <h2
              className="text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {section.title}
            </h2>

            {section.feels ? (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  What it feels like
                </p>
                <p className="prose-quiet mt-4 max-w-2xl text-base leading-loose text-foreground/90">
                  {section.feels}
                </p>
              </div>
            ) : null}

            {section.why ? (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  Why it happens
                </p>
                <ul className="prose-quiet mt-4 max-w-2xl space-y-3 text-base leading-loose text-muted-foreground">
                  {section.why.map((item) => (
                    <li key={item} className="border-l border-border/60 pl-5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {section.body ? (
              <div className="prose-quiet mt-8 max-w-2xl space-y-5 text-base leading-loose text-muted-foreground">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : null}

            {section.steps ? (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  What to do now
                </p>
                <ol className="prose-quiet mt-4 max-w-2xl space-y-4 text-base leading-loose text-foreground/90">
                  {section.steps.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {pillar.slug === "tools" ? (
        <div className="mt-5">
          <FocusTimer />
        </div>
      ) : null}

      <CareNote />

      <div className="mt-16 flex flex-wrap items-center gap-4">
        <Link
          to="/studio"
          className="rounded-full px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          All six pillars
        </Link>
        {next ? (
          <Link
            to="/pillars/$slug"
            params={{ slug: next.slug }}
            className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
          >
            Next — {next.name}
          </Link>
        ) : null}
      </div>
    </PageShell>
  );
}
