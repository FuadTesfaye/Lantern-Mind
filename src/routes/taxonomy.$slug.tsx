import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { ReadingToggle } from "@/components/reading-toggle";
import { getCategory, taxonomy, type TaxonomyCategory } from "@/content/taxonomy";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/taxonomy/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Lantern-Mind" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.title} — Lantern-Mind`;
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
          That chapter <em className="not-italic text-muted-foreground">isn't written yet.</em>
        </>
      }
      intro="The section you were looking for doesn't exist. The rest of the library is waiting in the Studio."
    >
      <Button asChild className="rounded-full px-8 py-5 bg-primary text-primary-foreground">
        <Link to="/studio">
          <ArrowLeft className="size-4 mr-2" />
          <span>Back to Library</span>
        </Link>
      </Button>
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
          <em className="not-italic text-muted-foreground">
            {category.title.split(" ").slice(-1)[0]}
          </em>
        </>
      }
      intro={category.intro}
    >
      <div className="mb-10 flex items-center justify-between border-b border-border/40 pb-6">
        <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground">
          <Link to="/studio">
            <ArrowLeft className="size-3.5 mr-1.5" />
            <span>Library</span>
          </Link>
        </Button>
        <ReadingToggle />
      </div>

      <div className="grid gap-8">
        {category.topics.map((topic, topicIdx) => (
          <article
            key={topic.title}
            className="rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-14 shadow-xl space-y-8"
          >
            <div>
              <span className="font-mono text-xs text-primary font-semibold block mb-2">
                0{topicIdx + 1}
              </span>
              <h2
                className="text-3xl sm:text-4xl leading-tight tracking-tight text-foreground font-normal"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {topic.title}
              </h2>
            </div>

            {topic.feels ? (
              <div className="rounded-2xl border border-border/60 bg-background/50 p-6 sm:p-7">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
                  What it feels like
                </p>
                <p className="prose-quiet text-base leading-relaxed text-foreground/90">
                  {topic.feels}
                </p>
              </div>
            ) : null}

            {topic.why ? (
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Why it happens (Neurobiology)
                </p>
                <ul className="prose-quiet space-y-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {topic.why.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/30 p-4">
                      <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {topic.body ? (
              <div className="prose-quiet space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {topic.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : null}

            {topic.steps ? (
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-primary">
                  Concrete Steps For Tomorrow
                </p>
                <ol className="prose-quiet space-y-3 text-sm sm:text-base leading-relaxed text-foreground/90">
                  {topic.steps.map((step, i) => (
                    <li key={step} className="flex gap-4 rounded-xl border border-border/60 bg-background/40 p-4 sm:p-5">
                      <span className="shrink-0 font-mono text-xs text-primary font-bold mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {topic.islamicView ? (
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-3">
                  <Sparkles className="size-3.5" />
                  <span>Faith & Spiritual Anchor</span>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
                  {topic.islamicView.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="shrink-0 text-primary">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {topic.whenToSeekHelp ? (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-destructive mb-3">
                  <ShieldAlert className="size-3.5" />
                  <span>When to Seek Clinical Care</span>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-destructive/90">
                  {topic.whenToSeekHelp.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {topic.relatedLink ? (
              <div className="pt-2">
                <Button asChild className="rounded-full px-6 py-5 bg-primary text-primary-foreground font-medium">
                  <Link to={topic.relatedLink.to}>
                    <span>{topic.relatedLink.label}</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-16">
        <CareNote />
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-8">
        <Button asChild variant="outline" className="rounded-full border-border bg-surface text-muted-foreground hover:text-foreground">
          <Link to="/studio">
            <ArrowLeft className="size-4 mr-2" />
            <span>All categories</span>
          </Link>
        </Button>
        {next ? (
          <Button asChild className="rounded-full px-8 py-5 bg-primary text-primary-foreground font-medium">
            <Link to="/taxonomy/$slug" params={{ slug: next.slug }}>
              <span>Next — {next.name}</span>
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        ) : null}
      </div>
    </PageShell>
  );
}
