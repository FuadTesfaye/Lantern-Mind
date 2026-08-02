import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reach-us")({
  head: () => ({
    meta: [
      { title: "Reach Us — write to Velorah" },
      {
        name: "description",
        content:
          "Write to Velorah with a question, a correction, or your own story. Replies are slow and human. Urgent distress needs a doctor or a crisis line.",
      },
      { property: "og:title", content: "Reach Us — write to Velorah" },
      {
        property: "og:description",
        content:
          "A quiet inbox. Questions, corrections, and stories welcome. Replies are slow and human.",
      },
    ],
  }),
  component: ReachUsPage,
});

function ReachUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert([{ name, email, message }]);

    if (error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      toast.success("Message received. We'll read it slowly.");
      setName("");
      setEmail("");
      setMessage("");
    }
    setIsSubmitting(false);
  };

  return (
    <PageShell
      eyebrow="Reach Us"
      title={
        <>
          Say what you need to say.{" "}
          <em className="not-italic text-muted-foreground">There is no rush here.</em>
        </>
      }
      intro="One inbox, read by a person. Questions about a pillar, a correction to something we got wrong, or just an account of your own fog — all of it is welcome, and none of it is stored anywhere else."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="liquid-glass rounded-3xl px-8 py-12 md:px-12">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Contact Form</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground">
                How should we address you?
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="bg-transparent border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Where should we reply?
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-transparent border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-muted-foreground">
                Your message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Take all the space you need..."
                required
                className="min-h-32 bg-transparent border-border/50 resize-y"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full rounded-full">
              {isSubmitting ? "Sending quietly..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-5">
          <div className="liquid-glass flex-1 rounded-3xl px-8 py-12 md:px-12">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              If it is urgent
            </p>
            <p
              className="mt-6 text-2xl leading-snug tracking-[-0.5px] text-foreground/90 sm:text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Please don't wait for an email.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              If you are in crisis, or thinking about harming yourself, contact your local emergency
              number or a crisis line in your country now. This site is educational writing; it
              cannot see you, and it cannot help quickly enough. A doctor or a crisis counsellor
              can.
            </p>
          </div>

          <div className="liquid-glass rounded-3xl px-8 py-12 md:px-12">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              What helps a reply
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li className="border-l border-border/60 pl-5">
                Which pillar or article you are writing about.
              </li>
              <li className="border-l border-border/60 pl-5">
                What you have already tried, and for how long.
              </li>
              <li className="border-l border-border/60 pl-5">
                What you are actually hoping for — an answer, a correction, or simply to be read.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
