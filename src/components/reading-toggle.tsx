import { useEffect, useState } from "react";

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
      className="liquid-glass rounded-full px-5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      {large ? "Normal text" : "Larger text"}
    </button>
  );
}
