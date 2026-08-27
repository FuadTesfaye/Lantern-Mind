import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { ClippedCircle } from "@/components/unlumen-ui/clipped-circle";
import { Lock, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else if (data.session) {
      toast.success("Logged in successfully");
      navigate({ to: "/admin" });
    }

    setIsLoading(false);
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else if (data.user) {
      toast.success("Sign up successful! Please check your email to verify or try logging in.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      <Tilt
        rotationFactor={5}
        className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        <form onSubmit={handleLogin} className="relative z-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-primary mb-3">
              <Lock className="size-3.5" />
              <span>Admin Access</span>
            </div>
            <h2
              className="text-3xl text-foreground font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Sign In to Sanctuary
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage community posts, submissions, and newsletters.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@lantern-mind.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-border bg-background/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-border bg-background/60"
              />
            </div>

            {/* Demo Credentials Helper */}
            <div className="rounded-xl border border-border/60 bg-background/40 p-3.5 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span className="font-mono text-primary">Demo Credentials:</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@lantern-mind.com");
                    setPassword("LanternAdmin123!");
                  }}
                  className="text-[11px] font-mono text-primary hover:underline font-medium"
                >
                  Auto-fill
                </button>
              </div>
              <p className="text-muted-foreground font-mono text-[11px]">Email: admin@lantern-mind.com</p>
              <p className="text-muted-foreground font-mono text-[11px]">Password: LanternAdmin123!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full rounded-full border-border bg-background/50 text-muted-foreground hover:text-foreground"
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <ClippedCircle circleClassName="bg-primary/20" circleSize={500} />
      </Tilt>
    </div>
  );
}
