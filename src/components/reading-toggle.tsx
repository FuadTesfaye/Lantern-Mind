import { useEffect, useState } from "react";
import { Type } from "lucide-react";

/**
 * Reading comfort toggle for long-form pages. Adds a class to <html>,
 * which scales .prose-quiet copy up for tired eyes.
 */
export function ReadingToggle() {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("reading-large", large);
    return () => document.documentElement.classList.remove("reading-large");
  }, [large]);

  return (
    <button
      type="button"
      onClick={() => setLarge((v) => !v)}
      aria-pressed={large}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-mono transition-all ${
        large
          ? "border-primary bg-primary/15 text-primary font-semibold"
          : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      <Type className="size-3.5" />
      <span>{large ? "Normal text size" : "Larger comfort text"}</span>
    </button>
  );
}
