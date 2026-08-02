import * as React from "react";
import { Link } from "@tanstack/react-router";

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
        desc: "You are currently showing a low risk of burnout. Keep maintaining healthy boundaries and taking time to rest.",
      };
    } else if (score <= maxScore * 0.66) {
      return {
        level: "Moderate Risk",
        desc: "You are experiencing some signs of burnout. It’s time to look at your workload, set boundaries, and prioritize daily recovery.",
      };
    } else {
      return {
        level: "High Risk",
        desc: "Your score suggests a high risk of burnout. You are likely running on empty. Prioritize immediate rest, reduce your commitments, and please consider speaking with a professional.",
      };
    }
  };

  return (
    <div className="liquid-glass overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="mb-8">
        <h3
          className="text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Burnout & Stress Assessment
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a self-assessment tool, not a diagnostic instrument. Answer how often you've felt
          this way in the past month.
        </p>
      </div>

      {!showResult ? (
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-4">
              <p className="text-sm font-medium text-foreground/90">
                {idx + 1}. {q.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Never", "Rarely", "Sometimes", "Often", "Always"].map((label, val) => (
                  <button
                    key={label}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      answers[q.id] === val
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/60 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowResult(true)}
            disabled={Object.keys(answers).length !== questions.length}
            className="liquid-glass mt-4 rounded-full px-8 py-3 text-sm text-foreground transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
          >
            See Results
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-700">
          <div className="rounded-2xl border border-border/40 bg-foreground/5 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Your Result</p>
            <h4
              className="mt-2 text-4xl text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {getResult().level}
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{getResult().desc}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setAnswers({});
                setShowResult(false);
              }}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Retake Quiz
            </button>
            <Link
              to="/taxonomy/$slug"
              params={{ slug: "understand" }}
              className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground transition-transform hover:scale-[1.03]"
            >
              Read About Burnout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
