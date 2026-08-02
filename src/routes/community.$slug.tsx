import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { PostDiscussion } from "@/components/community/post-discussion";
import { formatRelativeDate } from "@/lib/community/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/community/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: "Voice — Lantern-Mind" },
      {
        name: "description",
        content: `Anonymous story and discussion: ${params.slug}.`,
      },
    ],
  }),
  component: CommunityPostPage,
});

function CommunityPostPage() {
  const { slug } = Route.useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community_post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_posts")
        .select(
          `
          *,
          comments:community_comments(*)
        `,
        )
        .eq("slug", slug)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // not found
        throw error;
      }

      // Sort comments by created_at ascending (oldest first)
      if (data?.comments) {
        data.comments.sort(
          (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
      }
      return data;
    },
  });

  useEffect(() => {
    if (!post || post.status !== "Approved") return;
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#discussion") return;
    const el = document.getElementById("discussion");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [post]);

  if (isLoading) {
    return (
      <PageShell
        eyebrow="Voices"
        title={<>Opening the thread…</>}
        intro="Connecting to the live room."
      >
        <p className="text-sm text-muted-foreground">One moment.</p>
      </PageShell>
    );
  }

  if (error || (!post && !isLoading)) {
    return (
      <PageShell
        eyebrow="Voices"
        title={
          <>
            This thread isn’t <em className="not-italic text-muted-foreground">here.</em>
          </>
        }
        intro="It may still be under review, or it was removed. You can return to Voices anytime."
      >
        <Link
          to="/community"
          className="liquid-glass inline-flex rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Back to Voices
        </Link>
      </PageShell>
    );
  }

  if (post.status !== "Approved") {
    return (
      <PageShell
        eyebrow="Voices"
        title={
          <>
            Still with the <em className="not-italic text-muted-foreground">moderators.</em>
          </>
        }
        intro="This submission hasn’t been published yet. When it’s approved, the discussion will open here."
      >
        <Link
          to="/community"
          className="liquid-glass inline-flex rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Back to Voices
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Voices" title={post.title}>
      <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <Link to="/community" className="transition-colors hover:text-foreground">
          ← Voices
        </Link>
        <span aria-hidden>·</span>
        <span>{formatRelativeDate(post.published_at || post.created_at)}</span>
        <span aria-hidden>·</span>
        <span>— {post.author}</span>
        {post.comments?.length > 0 ? (
          <>
            <span aria-hidden>·</span>
            <a href="#discussion" className="transition-colors hover:text-foreground">
              {post.comments.length} in discussion
            </a>
          </>
        ) : null}
      </div>

      <article className="max-w-2xl animate-fade-rise">
        {post.tags?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mt-8 whitespace-pre-wrap text-base leading-[1.75] text-foreground/85 sm:text-lg">
          {post.body}
        </p>
        <p className="mt-10 text-sm text-muted-foreground">— {post.author}</p>
      </article>

      <div id="discussion" className="scroll-mt-28">
        <PostDiscussion postId={post.id} comments={post.comments || []} />
      </div>

      <CareNote>
        Peer witnessing only — not crisis care. If you need urgent help, contact local emergency
        services or a crisis line.
      </CareNote>
    </PageShell>
  );
}
