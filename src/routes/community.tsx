import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { PostPleaseDialog } from "@/components/community/post-please-dialog";
import { supportCircles } from "@/content/trauma";
import { formatRelativeDate } from "@/lib/community/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Voices & Community — Velorah" },
      {
        name: "description",
        content:
          "Anonymous stories tagged by lived experience, support circles by theme, and a space to be witnessed — not fixed.",
      },
      { property: "og:title", content: "Voices & Community — Velorah" },
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
  const queryClient = useQueryClient();
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
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <PostPleaseDialog />
        <Link
          to="/experiences"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Browse the experience map
        </Link>
        <Link
          to="/reach-us"
          className="rounded-full border border-destructive/25 bg-destructive/5 px-6 py-2.5 text-sm text-destructive/90 transition-colors hover:bg-destructive/10"
        >
          I need help now
        </Link>
      </div>

      {/* Voices */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Voices</p>
            <h2
              className="mt-3 text-3xl text-foreground sm:text-4xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Stories of recovery
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Human-sized tiles. Soft tags underneath. Click a story to read the full text and join
              the anonymous discussion. Use Post please to send a story for review before it appears
              here.
            </p>
          </div>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Live from Database
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
              activeTag === null
                ? "bg-foreground/15 text-foreground"
                : "bg-foreground/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            All threads
          </button>
          {allTags.map((tag: any) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                activeTag === tag
                  ? "bg-foreground/15 text-foreground"
                  : "bg-foreground/5 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {isLoading && (
            <p className="col-span-full text-sm text-muted-foreground">Loading stories...</p>
          )}
          {error && (
            <p className="col-span-full text-sm text-destructive">
              Error loading stories from database.
            </p>
          )}
          {stories.map((story: any) => (
            <Link
              key={story.id}
              to="/community/$slug"
              params={{ slug: story.slug }}
              className="liquid-glass group flex flex-col rounded-3xl p-7 transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <p className="text-xs text-muted-foreground">
                {formatRelativeDate(story.published_at)}
              </p>
              <h3
                className="mt-4 text-2xl leading-snug tracking-[-0.5px] text-foreground transition-colors group-hover:text-muted-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {story.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {story.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {story.tags?.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                <p className="text-xs text-foreground/60">— {story.author}</p>
                <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {story.comments && story.comments.length > 0
                    ? `${story.comments.length} in discussion`
                    : "Open story & discussion"}
                </span>
              </div>
            </Link>
          ))}
          {!isLoading && !error && stories.length === 0 ? (
            <p className="col-span-full text-sm text-muted-foreground">
              No stories found. Yours could be the first.
            </p>
          ) : null}
        </div>
      </section>

      {/* Circles */}
      <section id="circles" className="mt-20 scroll-mt-28">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Support Circles</p>
        <h2
          className="mt-3 text-3xl text-foreground sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Gather by theme, <em className="not-italic text-muted-foreground">not diagnosis.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Moderated rooms. Not therapy. The tags help match people who carry similar weight —
          parentification, displacement, burnout, return to faith, and more.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportCircles.map((circle) => (
            <article key={circle.slug} className="liquid-glass rounded-3xl px-6 py-7">
              <h3
                className="text-xl text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {circle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {circle.description}
              </p>
              <button
                type="button"
                className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Enter quietly
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Guidelines */}
      <div className="liquid-glass mt-16 rounded-3xl px-8 py-10 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          How we stay safe
        </p>
        <ul className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <li className="border-l border-border/60 pl-5">
            New stories use Post please — they wait in the admin queue before going public.
          </li>
          <li className="border-l border-border/60 pl-5">
            Discussions stay anonymous. Witness; don’t diagnose or pile on advice.
          </li>
          <li className="border-l border-border/60 pl-5">
            No trauma comparison or invalidation. Pain is not a contest.
          </li>
          <li className="border-l border-border/60 pl-5">
            No harassment, hate speech, or identifying information. Disagreements stay civil.
          </li>
        </ul>
      </div>

      <CareNote>
        This community is educational peer space, not therapy or crisis care. If you are in
        immediate danger or thinking of harming yourself, contact local emergency services or a
        crisis line now — don’t wait for a reply here.
      </CareNote>
    </PageShell>
  );
}
