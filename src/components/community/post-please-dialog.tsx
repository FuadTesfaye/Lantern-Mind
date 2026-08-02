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
        <button
          type="button"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Post please
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border/50 bg-background sm:max-w-lg">
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-normal tracking-[-0.5px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Post please
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your story goes to the admin queue first. Nothing is published until it’s reviewed. Stay
            anonymous — a soft label is enough.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A quiet title for what you carry"
              maxLength={120}
              required
              className="bg-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-body">Your story</Label>
            <Textarea
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write what you need witnessed. No need to perform strength."
              className="min-h-36 bg-transparent"
              maxLength={8000}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-author">How you’d like to appear (optional)</Label>
            <Input
              id="post-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Anonymous"
              maxLength={40}
              className="bg-transparent"
            />
          </div>

          <div className="space-y-3">
            <Label>Tags (up to 3)</Label>
            <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
              {tagLabels.map((label) => {
                const active = tags.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleTag(label)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      active
                        ? "bg-foreground/15 text-foreground"
                        : "bg-foreground/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-muted-foreground"
              disabled={submitPost.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitPost.isPending}>
              {submitPost.isPending ? "Sending..." : "Send for review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
