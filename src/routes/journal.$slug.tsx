import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { ReadingToggle } from "@/components/reading-toggle";
import { getArticle, type Article } from "@/content/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen, Quote } from "lucide-react";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — Lantern-Mind" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    const title = `${article.title} ${article.em ?? ""} — Lantern-Mind`.replace(/\s+/g, " ");
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
          This piece <em className="not-italic text-muted-foreground">isn't here.</em>
        </>
      }
      intro="The article you were looking for doesn't exist, or hasn't been written yet."
    >
      <Button asChild className="rounded-full px-8 py-5 bg-primary text-primary-foreground">
        <Link to="/journal">
          <ArrowLeft className="size-4 mr-2" />
          <span>Back to the Journal</span>
        </Link>
      </Button>
    </PageShell>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };

  return (
    <PageShell
      eyebrow={`${article.section} · ${article.readingTime}`}
      title={
        <>
          {article.title}{" "}
          {article.em ? <em className="not-italic text-muted-foreground">{article.em}</em> : null}
        </>
      }
      intro={article.dek}
    >
      <div className="mb-10 flex items-center justify-between border-b border-border/40 pb-6">
        <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground">
          <Link to="/journal">
            <ArrowLeft className="size-3.5 mr-1.5" />
            <span>All entries</span>
          </Link>
        </Button>
        <ReadingToggle />
      </div>

      <article className="rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-16 shadow-xl">
        <div className="max-w-2xl mx-auto">
          {article.blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mt-14 text-3xl leading-tight tracking-tight text-foreground first:mt-0 sm:text-4xl"
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
                  className="prose-quiet mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "quote") {
              return (
                <div key={i} className="my-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 relative">
                  <Quote className="size-6 text-primary/40 mb-3" />
                  <p
                    className="text-xl sm:text-2xl leading-snug tracking-tight text-foreground font-normal"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {block.text}
                  </p>
                </div>
              );
            }
            return (
              <ol key={i} className="mt-8 space-y-4">
                {block.items.map((item, n) => (
                  <li key={item} className="flex gap-4 rounded-xl border border-border/50 bg-background/40 p-4">
                    <span className="shrink-0 font-mono text-xs text-primary font-semibold mt-0.5">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span className="prose-quiet text-sm sm:text-base leading-relaxed text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            );
          })}
        </div>
      </article>

      <div className="mt-16">
        <CareNote />
      </div>

      <div className="mt-12">
        <Button asChild className="rounded-full px-8 py-5 bg-primary text-primary-foreground font-medium">
          <Link to="/journal">
            <ArrowLeft className="size-4 mr-2" />
            <span>More writing</span>
          </Link>
        </Button>
      </div>
    </PageShell>
  );
}
