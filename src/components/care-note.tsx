export function CareNote({ children }: { children?: React.ReactNode }) {
  return (
    <div className="liquid-glass mt-16 rounded-2xl px-6 py-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        {children ??
          "This is education, not medical advice. Persistent fog, memory loss, or exhaustion deserve a real check-up — a blood panel, a thyroid test, a conversation with a doctor. Asking for help is part of the protocol, not a failure of it."}
      </p>
    </div>
  );
}
