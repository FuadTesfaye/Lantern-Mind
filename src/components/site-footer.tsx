import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Compass, ShieldCheck, HeartHandshake } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    const { error } = await supabase.from("subscribers").insert([{ email, status: "Subscribed" }]);

    if (error) {
      if (error.code === "23505") {
        toast.info("You're already on the list. Thank you!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.success("Thank you for subscribing.");
      setEmail("");
    }
    setIsLoading(false);
  };

  return (
    <footer className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 pb-16 pt-20">
      {/* Newsletter Card */}
      <div className="mb-10 rounded-3xl border border-border bg-surface p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3 py-1 text-xs text-primary font-mono mb-4">
            <span className="size-1.5 rounded-full bg-primary" />
            <span>Gentle Dispatch</span>
          </div>
          <h3
            className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            A quiet reminder in your inbox
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Join for slow reflections, new community stories, and gentle prompts for
            your recovery. No spam, ever.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-full border-border bg-background/80 px-4 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 rounded-full px-6 bg-primary text-primary-foreground hover:opacity-90 font-medium"
          >
            {isLoading ? "Joining..." : (
              <span className="flex items-center gap-1.5">
                <span>Join</span>
                <Send className="size-3.5" />
              </span>
            )}
          </Button>
        </form>
      </div>

      {/* Main Footer Block */}
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 flex flex-col justify-between gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl tracking-tight text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <Compass className="size-5 text-primary" />
              <span>
                Lantern-Mind<sup className="text-xs ml-0.5">®</sup>
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              A quiet place for people rebuilding their attention, their memory, and their sense of
              themselves. Nothing here is sold, gated, or hurried.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-sm">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                Explore
              </span>
              <Link to="/studio" className="text-muted-foreground hover:text-foreground transition-colors">
                Library
              </Link>
              <Link to="/experiences" className="text-muted-foreground hover:text-foreground transition-colors">
                Atlas
              </Link>
              <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                Instruments
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                Community
              </span>
              <Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                Voices
              </Link>
              <Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors">
                The Journal
              </Link>
              <Link to="/reach-us" className="text-muted-foreground hover:text-foreground transition-colors">
                Reach Us
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                Ethics
              </span>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Our Promises
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Zero Tracking
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Educational writing only — not medical advice or diagnosis. If you are in crisis, please contact local emergency support.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-mono">
            <span>© {new Date().getFullYear()} Lantern-Mind</span>
            <span>MIT / Unlumen</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
