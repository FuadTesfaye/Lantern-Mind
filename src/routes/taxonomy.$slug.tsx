import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { FocusTimer } from "@/components/focus-timer";
import { ReadingToggle } from "@/components/reading-toggle";
import { getCategory, taxonomy, type TaxonomyCategory } from "@/content/taxonomy";

export const Route = createFileRoute("/taxonomy/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Velorah" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.title} — Velorah`;
    return {
      meta: [
        { title },
        { name: "description", content: category.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: category.summary },
      ],
    };
  },
  component: TaxonomyCategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryNotFound() {
  return (
    <PageShell
      title={
        <>
          That chapter{" "}
          <em className="not-italic text-muted-foreground">isn't written yet.</em>
        </>
      }
      intro="The section you were looking for doesn't exist. The rest of the library is waiting in the Studio."
    >
      <Link
        to="/studio"
        className="liquid-glass inline-block rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
      >
        Back to the Library
      </Link>
    </PageShell>
  );
}

function TaxonomyCategoryPage() {
  const { category } = Route.useLoaderData() as { category: TaxonomyCategory };
  const index = taxonomy.findIndex((c) => c.slug === category.slug);
  const next = taxonomy[index + 1];

  return (
    <PageShell
      eyebrow={category.name}
      title={
        <>
          {category.title.split(" ").slice(0, -1).join(" ")}{" "}
          <em className="not-italic text-muted-foreground">{category.title.split(" ").slice(-1)[0]}</em>
        </>
      }
      intro={category.intro}
    >
      <div className="mb-12">
        <ReadingToggle />
      </div>

      <div className="grid gap-5">
        {category.topics.map((topic) => (
          <article
            key={topic.title}
            className="liquid-glass rounded-3xl px-8 py-10 md:px-12 md:py-14"
          >
            <h2
              className="text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {topic.title}
            </h2>

            {topic.feels ? (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  What it feels like
                </p>
                <p className="prose-quiet mt-4 max-w-2xl text-base leading-loose text-foreground/90">
                  {topic.feels}
                </p>
              </div>
            ) : null}

            {topic.why ? (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  Why it happens
                </p>
                <ul className="prose-quiet mt-4 max-w-2xl space-y-3 text-base leading-loose text-muted-foreground">
                  {topic.why.map((item) => (
                    <li key={item} className="border-l border-border/60 pl-5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {topic.body ? (
              <div className="prose-quiet mt-8 max-w-2xl space-y-5 text-base leading-loose text-muted-foreground">
                {topic.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : null}

            {topic.steps ? (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  What to do now
                </p>
                <ol className="prose-quiet mt-4 max-w-2xl space-y-4 text-base leading-loose text-foreground/90">
                  {topic.steps.map((step, i) => (
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

            {topic.whenToSeekHelp ? (
              <div className="mt-10 rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-destructive/80">
                  When to Seek Help
                </p>
                <ul className="mt-4 space-y-2 text-sm text-destructive/80">
                  {topic.whenToSeekHelp.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <CareNote />

      <div className="mt-16 flex flex-wrap items-center gap-4">
        <Link
          to="/studio"
          className="rounded-full px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          All categories
        </Link>
        {next ? (
          <Link
            to="/taxonomy/$slug"
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
