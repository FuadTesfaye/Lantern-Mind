import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { PostPleaseDialog } from "@/components/community/post-please-dialog";
import { supportCircles } from "@/content/trauma";
import { formatRelativeDate } from "@/lib/community/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { MotionHighlightContainer, MotionHighlightItem } from "@/components/unlumen-ui/motion-highlight";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShieldCheck, ArrowRight, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Voices & Community — Lantern-Mind" },
      {
        name: "description",
        content:
          "Anonymous stories tagged by lived experience, support circles by theme, and a space to be witnessed — not fixed.",
      },
      { property: "og:title", content: "Voices & Community — Lantern-Mind" },
      {
        property: "og:description",
        content:
          "Human-sized stories, soft tags, and moderated circles. Post please for review — then talk anonymously on published threads.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const {
    data: published = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_posts")
        .select(
          `
          id, slug, title, excerpt, author, tags, published_at,
          comments:community_comments(id)
        `,
        )
        .eq("status", "Approved")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const allTags = useMemo(() => {
    return [...new Set(published.flatMap((s: any) => s.tags || []))].sort();
  }, [published]);

  const stories = useMemo(() => {
    if (!activeTag) return published;
    return published.filter((s: any) => (s.tags || []).includes(activeTag));
  }, [activeTag, published]);

  return (
    <PageShell
      eyebrow="Voices & Community"
      title={
        <>
          You are not <em className="not-italic text-muted-foreground">alone.</em>
        </>
      }
      intro="A safe, moderated space for stories of recovery and circles of shared experience. Stories are anonymous. Tags come from the lived-experience map — not clinical labels. We witness; we do not diagnose."
    >
      {/* Top Actions */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <PostPleaseDialog />
        <Button asChild variant="outline" className="rounded-full border-border bg-surface text-foreground hover:bg-card">
          <Link to="/experiences">
            <span>Browse Experience Map</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10">
          <Link to="/reach-us">
            <span>I need help now</span>
          </Link>
        </Button>
      </div>

      {/* Voices Feed */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-2">
              <MessageCircle className="size-3.5" />
              <span>Stories of Recovery</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Recent community submissions
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Moderated
          </span>
        </div>

        {/* Tag Filters with Unlumen Motion Highlight */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTag === null
                ? "border border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                : "border border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            All Threads ({published.length})
          </button>
          {allTags.map((tag: any) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTag === tag
                  ? "border border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "border border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {isLoading && (
            <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
              Loading stories...
            </div>
          )}
          {error && (
            <div className="col-span-full rounded-2xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
              Error connecting to live community database.
            </div>
          )}
          {stories.map((story: any) => (
            <TiltCard
              key={story.id}
              price={formatRelativeDate(story.published_at)}
              badgeLabel={`by ${story.author || "Anonymous"}`}
              badgeVariant="neutral"
              title={story.title}
              description={story.excerpt}
              footerSlot={
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags?.map((t: string) => (
                      <span
                        key={t}
                        className="rounded-full bg-foreground/5 border border-border/50 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-primary font-medium">
                      {story.comments && story.comments.length > 0
                        ? `${story.comments.length} in discussion`
                        : "Open story & discussion"}
                    </span>
                    <Button asChild variant="ghost" size="sm" className="text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10">
                      <Link to="/community/$slug" params={{ slug: story.slug }}>
                        <span>Read</span>
                        <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              }
            />
          ))}

          {!isLoading && !error && stories.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-border bg-surface p-12 text-center">
              <MessageCircle className="size-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                No stories match this filter. Be the first to share.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Support Circles */}
      <section id="circles" className="mt-24 border-t border-border/40 pt-16 scroll-mt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
          <Users className="size-3.5" />
          <span>Support Circles</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Gather by theme, <em className="not-italic text-muted-foreground">not diagnosis.</em>
        </h2>
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          Moderated rooms. Not therapy. The tags help match people who carry similar weight —
          parentification, displacement, burnout, return to faith, and more.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supportCircles.map((circle) => (
            <TiltCard
              key={circle.slug}
              title={circle.title}
              description={circle.description}
              badgeLabel="Circle"
              badgeVariant="primary"
              footerSlot={
                <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  Enter quietly →
                </span>
              }
            />
          ))}
        </div>
      </section>

      {/* Community Guidelines */}
      <div className="mt-16 rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-6">
          <ShieldCheck className="size-3.5" />
          <span>Sanctuary Guidelines</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
          <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
            <span className="text-foreground font-medium block mb-1">Human-Reviewed Queue</span>
            New stories use "Post please" — they are gently reviewed before appearing publicly.
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
            <span className="text-foreground font-medium block mb-1">Anonymous & Compassionate</span>
            Discussions stay anonymous. Witness each other; do not diagnose or force unsolicited advice.
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
            <span className="text-foreground font-medium block mb-1">No Comparison</span>
            No trauma comparison or invalidation. Every human struggle is valid; pain is not a contest.
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
            <span className="text-foreground font-medium block mb-1">Dignity Protected</span>
            Zero tolerance for harassment or identifying private details. Civility is mandatory.
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CareNote>
          This community is educational peer space, not therapy or crisis care. If you are in
          immediate danger or thinking of harming yourself, contact local emergency services or a
          crisis line now — don’t wait for a reply here.
        </CareNote>
      </div>
    </PageShell>
  );
}
