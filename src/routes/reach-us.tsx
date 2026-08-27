import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, ShieldAlert, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/reach-us")({
  head: () => ({
    meta: [
      { title: "Reach Us — write to Lantern-Mind" },
      {
        name: "description",
        content:
          "Write to Lantern-Mind with a question, a correction, or your own story. Replies are slow and human. Urgent distress needs a doctor or a crisis line.",
      },
      { property: "og:title", content: "Reach Us — write to Lantern-Mind" },
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
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Form Card */}
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-6">
            <Mail className="size-3.5" />
            <span>Direct Inbox</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                How should we address you?
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="rounded-xl border-border bg-background/60 text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Where should we reply?
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="rounded-xl border-border bg-background/60 text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Your message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Take all the space you need..."
                required
                className="min-h-36 rounded-xl border-border bg-background/60 text-foreground resize-y"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full py-5 bg-primary text-primary-foreground font-medium hover:opacity-90 gap-1.5"
            >
              <Send className="size-3.5" />
              <span>{isSubmitting ? "Sending quietly..." : "Send Message"}</span>
            </Button>
          </form>
        </div>

        {/* Right Info Panels */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-destructive mb-4">
              <ShieldAlert className="size-3.5" />
              <span>If it is urgent</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Please don't wait for an email.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If you are in crisis, or thinking about harming yourself, contact your local emergency
              number or a crisis line in your country immediately. This site is educational writing; it
              cannot see you, and it cannot help quickly enough. A clinician or crisis counselor can.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-4">
              <HeartHandshake className="size-3.5" />
              <span>What helps a reply</span>
            </div>
            <ul className="space-y-3.5 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>Which pillar or article you are writing about.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>What you have already tried, and for how long.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>What you are hoping for — an answer, a correction, or simply to be heard.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
