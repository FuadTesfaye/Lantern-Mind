import * as React from "react";
import { Link } from "@tanstack/react-router";
import { HeartPulse, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  { id: 1, text: "I feel emotionally drained from my work or daily tasks." },
  { id: 2, text: "I feel used up at the end of the workday." },
  { id: 3, text: "I feel fatigued when I get up in the morning and have to face another day." },
  { id: 4, text: "I have become more cynical about whether my work has any meaning." },
  { id: 5, text: "I doubt the significance of the things I do." },
];

export function BurnoutQuiz() {
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [showResult, setShowResult] = React.useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((acc, val) => acc + val, 0);
    return total;
  };

  const score = calculateScore();
  const maxScore = questions.length * 4; // 0 to 4 per question

  const getResult = () => {
    if (score <= maxScore * 0.33) {
      return {
        level: "Low Risk",
        badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        desc: "You are currently showing a low risk of burnout. Keep maintaining healthy boundaries and taking time to rest.",
      };
    } else if (score <= maxScore * 0.66) {
      return {
        level: "Moderate Risk",
        badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        desc: "You are experiencing signs of chronic cognitive strain. It’s time to inspect commitments, establish hard boundaries, and prioritize active recovery.",
      };
    } else {
      return {
        level: "High Risk",
        badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
        desc: "Your score suggests a high state of nervous exhaustion. You are likely running on fumes. Prioritize immediate rest, reduce commitments, and please speak with a supportive professional.",
      };
    }
  };

  const result = getResult();

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 md:p-12 shadow-xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
            <HeartPulse className="size-3.5 text-rose-400" />
            <span>Self-Assessment</span>
          </div>
          <h3
            className="text-3xl sm:text-4xl text-foreground font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Burnout & Stress Assessment
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            A private self-assessment tool. Reflect on how often you've experienced these states in the past month.
          </p>
        </div>

        <span className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-mono text-muted-foreground self-start sm:self-auto">
          {Object.keys(answers).length} / {questions.length} Answered
        </span>
      </div>

      {!showResult ? (
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-border/60 bg-background/40 p-5 sm:p-6 space-y-4"
            >
              <p className="text-base font-medium text-foreground">
                <span className="font-mono text-xs text-primary mr-2">0{idx + 1}</span>
                {q.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Never", "Rarely", "Sometimes", "Often", "Always"].map((label, val) => {
                  const isSelected = answers[q.id] === val;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleAnswer(q.id, val)}
                      className={`rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Button
              onClick={() => setShowResult(true)}
              disabled={Object.keys(answers).length !== questions.length}
              className="rounded-full px-8 py-5 bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-40"
            >
              <span>See Results</span>
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 space-y-6">
          <div className="rounded-2xl border border-border bg-background/60 p-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className={`rounded-full border px-4 py-1 text-xs font-mono uppercase tracking-widest font-semibold ${result.badgeColor}`}>
                {result.level}
              </span>
            </div>

            <h4
              className="text-4xl text-foreground font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Score: {score} <span className="text-xl text-muted-foreground">/ {maxScore}</span>
            </h4>

            <p className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-muted-foreground">
              {result.desc}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setAnswers({});
                  setShowResult(false);
                }}
                className="rounded-full border-border bg-surface text-foreground gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                <span>Retake Assessment</span>
              </Button>

              <Button asChild className="rounded-full bg-primary text-primary-foreground">
                <Link to="/taxonomy/$slug" params={{ slug: "rebuild" }}>
                  <span>Explore Recovery Guides</span>
                  <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
