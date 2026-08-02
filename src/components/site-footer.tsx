import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
        // Unique constraint violation (already subscribed)
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
    <footer className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-16 pt-24">
      {/* Newsletter Section */}
      <div className="mb-12 liquid-glass rounded-3xl px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-border/50">
        <div className="max-w-xl text-center md:text-left">
          <h3
            className="text-3xl text-foreground sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            A gentle reminder in your inbox
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Join our newsletter for quiet reflections, new community stories, and gentle prompts for
            your own recovery. No spam, ever.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="flex w-full max-w-sm items-center gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-foreground/10 text-foreground"
          />
          <Button type="submit" disabled={isLoading} className="rounded-full">
            {isLoading ? "Joining..." : "Join"}
          </Button>
        </form>
      </div>

      <div className="liquid-glass rounded-3xl px-8 py-10">
        <p
          className="text-2xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Lantern-Mind<sup className="text-xs">®</sup>
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          A quiet place for people rebuilding their attention, their memory, and their sense of
          themselves. Nothing here is sold, gated, or hurried.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <Link to="/studio" className="transition-colors hover:text-foreground">
            Library
          </Link>
          <Link to="/experiences" className="transition-colors hover:text-foreground">
            Experiences
          </Link>
          <Link to="/community" className="transition-colors hover:text-foreground">
            Community
          </Link>
          <Link to="/journal" className="transition-colors hover:text-foreground">
            Journal
          </Link>
          <Link to="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="/reach-us" className="transition-colors hover:text-foreground">
            Reach Us
          </Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Educational writing only — not medical advice, not a diagnosis, not a substitute for care.
          If you are struggling badly, or thinking of harming yourself, please reach a doctor or a
          local crisis line today.
        </p>
      </div>
    </footer>
  );
}
