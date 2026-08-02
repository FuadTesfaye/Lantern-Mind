import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { articles } from "@/content/articles";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Velorah writing on fog, focus and repair" },
      {
        name: "description",
        content:
          "Long-form pieces on brain fog, mental arithmetic, reading again, and the first week of real sleep. Feeling, science, and a practical path.",
      },
      { property: "og:title", content: "Journal — Velorah" },
      {
        property: "og:description",
        content:
          "Long-form writing on brain fog, attention, memory and repair — feeling, science, and a practical path.",
      },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  return (
    <PageShell
      eyebrow="Journal"
      title={
        <>
          Written for the person{" "}
          <em className="not-italic text-muted-foreground">
            who finds this at 2am.
          </em>
        </>
      }
      intro="One piece at a time, written slowly. Each begins with how it feels, explains what is actually happening in plain language, and ends with something you can do tomorrow."
    >
      <div className="grid gap-5">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to="/journal/$slug"
            params={{ slug: article.slug }}
            className="liquid-glass rounded-3xl px-8 py-10 transition-transform hover:scale-[1.005] md:px-12"
          >
            <div className="flex flex-wrap gap-x-6 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span>{article.section}</span>
              <span>{article.readingTime}</span>
            </div>
            <h2
              className="mt-6 max-w-3xl text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {article.title}{" "}
              {article.em ? (
                <em className="not-italic text-muted-foreground">{article.em}</em>
              ) : null}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {article.dek}
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
