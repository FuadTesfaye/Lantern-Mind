import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { storyTagOptions } from "@/content/trauma";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Plus, Send, Sparkles } from "lucide-react";

export function PostPleaseDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const tagLabels = useMemo(() => [...new Set(storyTagOptions.map((t) => t.label))].sort(), []);

  const toggleTag = (label: string) => {
    setTags((prev) => {
      if (prev.includes(label)) return prev.filter((t) => t !== label);
      if (prev.length >= 3) return prev;
      return [...prev, label];
    });
  };

  const reset = () => {
    setTitle("");
    setBody("");
    setAuthor("");
    setTags([]);
  };

  const submitPost = useMutation({
    mutationFn: async () => {
      const slug =
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 50) +
        "-" +
        Math.random().toString(36).substring(2, 8);
      const excerpt = body.slice(0, 150) + (body.length > 150 ? "..." : "");
      const { data, error } = await supabase.from("community_posts").insert([
        {
          slug,
          title,
          body,
          excerpt,
          author: author.trim() || "Anonymous",
          tags,
          status: "Pending",
        },
      ]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Sent to moderators", {
        description: "If it’s a fit, it will appear on Voices after review.",
      });
      reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Error submitting story: ${error.message}`);
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title.trim().length < 3 || body.trim().length < 20) {
      toast.error("Add a short title and at least a few sentences.");
      return;
    }
    submitPost.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6 py-2.5 bg-primary text-primary-foreground font-medium hover:opacity-90 gap-1.5 shadow-sm">
          <Plus className="size-4" />
          <span>Share Story</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-surface sm:max-w-lg rounded-3xl p-6 sm:p-8">
        <DialogHeader>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary w-fit mb-2">
            <Sparkles className="size-3" />
            <span>Anonymous Submission</span>
          </div>
          <DialogTitle
            className="text-2xl text-foreground font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Post a reflection
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Submissions are human-moderated before appearing on Voices. Witness each other gently.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="post-title" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Title
            </Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Learning to read again after burnout"
              maxLength={120}
              required
              className="rounded-xl border-border bg-background/60"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="post-body" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Your reflection
            </Label>
            <Textarea
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did it feel like? What helped slightly? What do you wish someone had told you?"
              className="min-h-36 rounded-xl border-border bg-background/60"
              maxLength={4000}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="post-author" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Display name (or leave as Anonymous)
            </Label>
            <Input
              id="post-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Anonymous"
              maxLength={40}
              className="rounded-xl border-border bg-background/60"
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span className="font-mono uppercase tracking-wider">Select up to 3 tags</span>
              <span className="font-mono text-primary">{tags.length} / 3</span>
            </div>
            <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto rounded-xl border border-border/80 bg-background/40 p-3">
              {tagLabels.map((label) => {
                const selected = tags.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleTag(label)}
                    className={`rounded-full px-2.5 py-1 text-xs font-mono transition-all ${
                      selected
                        ? "border border-primary bg-primary text-primary-foreground font-semibold"
                        : "border border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    #{label}
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-full border-border bg-background/60 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitPost.isPending}
              className="rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 gap-1.5"
            >
              <Send className="size-3.5" />
              <span>{submitPost.isPending ? "Submitting…" : "Send for Review"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
