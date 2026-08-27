import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Library" },
  { to: "/experiences", label: "Experiences" },
  { to: "/tools", label: "Tools" },
  { to: "/community", label: "Community" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/reach-us", label: "Reach Us" },
] as const;

export function SiteNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 pt-3 pb-2">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 sm:px-6 py-2 transition-all duration-300",
          isScrolled
            ? "border-border bg-surface/90 shadow-xl backdrop-blur-xl"
            : "border-border/60 bg-surface/75 shadow-md backdrop-blur-lg",
        )}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-2xl font-normal tracking-tight text-foreground transition-colors hover:text-primary"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform shadow-xs">
            <Compass className="size-4" />
          </span>
          <span className="flex items-center">
            Lantern-Mind<sup className="text-[10px] text-muted-foreground ml-0.5">®</sup>
          </span>
        </Link>

        {/* Desktop Navigation Links with Unlumen Motion Highlight */}
        <div className="hidden items-center gap-1 lg:flex bg-background/50 border border-border/50 rounded-full p-1 shadow-inner">
          {links.map((link) => {
            const isActive =
              link.to === "/" ? currentPath === "/" : currentPath.startsWith(link.to);

            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative z-10 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-150",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="unlumen-nav-active"
                    className="absolute inset-0 rounded-full bg-surface border border-border/80 shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Action & Live Online Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Safe & Open Indicator */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs text-muted-foreground select-none"
            title="Safe peer space open"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] text-foreground/80 tracking-wide">Safe & Open</span>
          </div>

          <Link
            to="/studio"
            className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-primary px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-95 hover:shadow-md active:scale-95 shadow-xs"
          >
            <Sparkles className="size-3.5 transition-transform group-hover:rotate-12" />
            <span>Begin Journey</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex lg:hidden size-9 items-center justify-center rounded-full border border-border bg-surface text-foreground hover:bg-card transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:hidden mx-auto max-w-7xl mt-2 rounded-3xl border border-border bg-surface/95 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1.5">
              {links.map((link) => {
                const isActive =
                  link.to === "/" ? currentPath === "/" : currentPath.startsWith(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "text-muted-foreground hover:bg-card hover:text-foreground",
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="size-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
