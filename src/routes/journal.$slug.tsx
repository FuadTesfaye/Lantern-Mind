import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { ReadingToggle } from "@/components/reading-toggle";
import { getArticle, type Article } from "@/content/articles";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — Velorah" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    const title = `${article.title} ${article.em ?? ""} — Velorah`.replace(/\s+/g, " ");
    return {
      meta: [
        { title },
        { name: "description", content: article.dek },
        { property: "og:title", content: title },
        { property: "og:description", content: article.dek },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticleNotFound() {
  return (
    <PageShell
      title={
        <>
          This piece{" "}
          <em className="not-italic text-muted-foreground">isn't here.</em>
        </>
      }
      intro="The article you were looking for doesn't exist, or hasn't been written yet."
    >
      <Link
        to="/journal"
        className="liquid-glass inline-block rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
      >
        Back to the Journal
      </Link>
    </PageShell>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };

  return (
    <PageShell
      eyebrow={`${article.section} — ${article.readingTime}`}
      title={
        <>
          {article.title}{" "}
          {article.em ? (
            <em className="not-italic text-muted-foreground">{article.em}</em>
          ) : null}
        </>
      }
      intro={article.dek}
    >
      <div className="mb-12">
        <ReadingToggle />
      </div>

      <article className="liquid-glass rounded-3xl px-8 py-12 md:px-14 md:py-16">
        <div className="max-w-2xl">
          {article.blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mt-14 text-3xl leading-tight tracking-[-1px] text-foreground first:mt-0 sm:text-4xl"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "p") {
              return (
                <p
                  key={i}
                  className="prose-quiet mt-6 text-base leading-loose text-muted-foreground"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "quote") {
              return (
                <p
                  key={i}
                  className="mt-12 border-l border-border/60 pl-6 text-2xl leading-snug tracking-[-0.5px] text-foreground/90 sm:text-3xl"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {block.text}
                </p>
              );
            }
            return (
              <ol key={i} className="mt-8 space-y-5">
                {block.items.map((item, n) => (
                  <li key={item} className="flex gap-5">
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span className="prose-quiet text-base leading-loose text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            );
          })}
        </div>
      </article>

      <CareNote />

      <div className="mt-16">
        <Link
          to="/journal"
          className="liquid-glass inline-block rounded-full px-10 py-4 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          More writing
        </Link>
      </div>
    </PageShell>
  );
}
