import { useState, type FormEvent } from "react";
import { formatRelativeDate, type CommunityComment } from "@/lib/community/types";
import type { useCommunitySocket } from "@/hooks/use-community-socket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Send = ReturnType<typeof useCommunitySocket>["send"];
type Status = ReturnType<typeof useCommunitySocket>["status"];

type PostDiscussionProps = {
  postId: string;
  comments: CommunityComment[];
  send: Send;
  status: Status;
};

export function PostDiscussion({ postId, comments, send, status }: PostDiscussionProps) {
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (status !== "open") return;
    send({
      type: "add_comment",
      postId,
      body,
      ...(author.trim() ? { author: author.trim() } : {}),
    });
    setBody("");
  };

  return (
    <section className="mt-14 border-t border-border/40 pt-12">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Discussion</p>
      <h2
        className="mt-3 text-3xl text-foreground sm:text-4xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Talk quietly, <em className="not-italic text-muted-foreground">anonymously.</em>
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Witness each other. No advice piles, no ranking pain. Messages appear live for everyone in
        this thread.
      </p>

      <ul className="mt-10 space-y-6">
        {comments.length === 0 ? (
          <li className="text-sm text-muted-foreground">
            No one has spoken yet. You can be the first gentle voice.
          </li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="animate-fade-rise border-l border-border/50 pl-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xs text-foreground/70">— {comment.author}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeDate(comment.createdAt)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{comment.body}</p>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share a quiet response…"
          className="min-h-28 bg-transparent"
          maxLength={2000}
          required
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Anonymous"
            maxLength={40}
            className="bg-transparent sm:max-w-[220px]"
            aria-label="Display name"
          />
          <Button type="submit" disabled={status !== "open"} className="sm:ml-auto">
            {status === "open" ? "Send anonymously" : "Connecting…"}
          </Button>
        </div>
      </form>
    </section>
  );
}
