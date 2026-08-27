import { useState, type FormEvent } from "react";
import { formatRelativeDate } from "@/lib/community/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
        <MessageCircle className="size-3.5" />
        <span>Discussion</span>
      </div>
      <h2
        className="text-3xl text-foreground sm:text-4xl font-normal tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Talk quietly, <em className="not-italic text-muted-foreground">anonymously.</em>
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Witness each other. No advice piles, no ranking pain. Messages appear live for everyone in
        this thread.
      </p>

      <div className="mt-8 space-y-4 max-w-2xl">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-surface/50 p-6 text-center text-sm text-muted-foreground">
            No one has spoken yet. You can be the first gentle voice.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-border/60 bg-surface p-5 sm:p-6 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border border-border">
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                      {comment.author?.charAt(0)?.toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium text-foreground">{comment.author}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {formatRelativeDate(comment.created_at || comment.createdAt)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap pl-8">
                {comment.body}
              </p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-8 max-w-2xl space-y-4 rounded-3xl border border-border bg-surface p-6 sm:p-7">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share a gentle reflection or note of solidarity…"
          className="min-h-28 rounded-xl border-border bg-background/60 text-foreground"
          maxLength={2000}
          required
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Display name (or Anonymous)"
            maxLength={40}
            className="rounded-xl border-border bg-background/60 sm:max-w-[220px]"
            aria-label="Display name"
          />
          <Button
            type="submit"
            disabled={addComment.isPending}
            className="rounded-full px-6 py-2 bg-primary text-primary-foreground font-medium hover:opacity-90 gap-1.5 self-end sm:self-auto"
          >
            <Send className="size-3.5" />
            <span>{addComment.isPending ? "Posting…" : "Post Anonymously"}</span>
          </Button>
        </div>
      </form>
    </section>
  );
}
