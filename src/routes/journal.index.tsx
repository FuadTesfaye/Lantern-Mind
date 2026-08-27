import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { articles } from "@/content/articles";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Lantern-Mind writing on fog, focus and repair" },
      {
        name: "description",
        content:
          "Long-form pieces on brain fog, mental arithmetic, reading again, and the first week of real sleep. Feeling, science, and a practical path.",
      },
      { property: "og:title", content: "Journal — Lantern-Mind" },
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
      eyebrow="The Journal"
      title={
        <>
          Written for the person{" "}
          <em className="not-italic text-muted-foreground">who finds this at 2am.</em>
        </>
      }
      intro="One piece at a time, written slowly. Each begins with how it feels, explains what is actually happening in plain language, and ends with something you can do tomorrow."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <TiltCard
            key={article.slug}
            price={article.section}
            badgeLabel={article.readingTime}
            badgeVariant="primary"
            title={
              <span>
                {article.title}{" "}
                {article.em ? (
                  <em className="not-italic text-muted-foreground">{article.em}</em>
                ) : null}
              </span>
            }
            description={article.dek}
            footerSlot={
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
              >
                <Link to="/journal/$slug" params={{ slug: article.slug }}>
                  <span>Read full piece</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            }
          />
        ))}
      </div>
    </PageShell>
  );
}
