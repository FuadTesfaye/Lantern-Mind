import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { PostDiscussion } from "@/components/community/post-discussion";
import { useCommunitySocket } from "@/hooks/use-community-socket";
import { formatRelativeDate } from "@/lib/community/types";

export const Route = createFileRoute("/community/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: "Voice — Velorah" },
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
  const { getPost, send, status, published } = useCommunitySocket();
  const post = getPost(slug);
  const ready = status === "open" || published.length > 0;

  useEffect(() => {
    if (!post || post.status !== "published") return;
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#discussion") return;
    const el = document.getElementById("discussion");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [post]);

  if (ready && !post) {
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

  if (!post) {
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

  if (post.status !== "published") {
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
        <span>{formatRelativeDate(post.publishedAt ?? post.createdAt)}</span>
        <span aria-hidden>·</span>
        <span>— {post.author}</span>
        {post.comments.length > 0 ? (
          <>
            <span aria-hidden>·</span>
            <a href="#discussion" className="transition-colors hover:text-foreground">
              {post.comments.length} in discussion
            </a>
          </>
        ) : null}
      </div>

      <article className="max-w-2xl animate-fade-rise">
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
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
        <PostDiscussion postId={post.id} comments={post.comments} send={send} status={status} />
      </div>

      <CareNote>
        Peer witnessing only — not crisis care. If you need urgent help, contact local emergency
        services or a crisis line.
      </CareNote>
    </PageShell>
  );
}
