import { useState, type FormEvent } from "react";
import { formatRelativeDate, type CommunityComment } from "@/lib/community/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type PostDiscussionProps = {
  postId: string;
  comments: any[];
};

export function PostDiscussion({ postId, comments }: PostDiscussionProps) {
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from("community_comments").insert([
        {
          post_id: postId,
          body,
          author: author.trim() || "Anonymous",
        },
      ]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Comment added quietly.");
      setBody("");
      queryClient.invalidateQueries({ queryKey: ["community_post"] });
    },
    onError: (error) => {
      toast.error(`Could not add comment: ${error.message}`);
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!body.trim()) return;
    addComment.mutate();
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
                  {formatRelativeDate(comment.created_at || comment.createdAt)}
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
          <Button type="submit" disabled={addComment.isPending} className="sm:ml-auto">
            {addComment.isPending ? "Sending…" : "Send anonymously"}
          </Button>
        </div>
      </form>
    </section>
  );
}
