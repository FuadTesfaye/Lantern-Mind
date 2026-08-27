import { ShieldCheck } from "lucide-react";

export function CareNote({ children }: { children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-surface/90 p-6 shadow-sm flex items-start gap-4">
      <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
        <ShieldCheck className="size-4" />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {children ??
          "This is education, not medical advice. Persistent fog, memory loss, or exhaustion deserve a real check-up — a blood panel, a thyroid test, a conversation with a doctor. Asking for help is part of the protocol, not a failure of it."}
      </p>
    </div>
  );
}
