export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  em?: string;
  dek: string;
  readingTime: string;
  section: string;
  date: string;
  blocks: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "why-cant-i-do-math-in-my-head-anymore",
    title: "Why can't I do math",
    em: "in my head anymore?",
    dek: "You used to play with numbers. Now you reach for the calculator to find fifteen percent of forty. Here is what actually happened — and how the circuit wakes back up.",
    readingTime: "8 min",
    section: "Understand",
    date: "2026",
    blocks: [
      { type: "h2", text: "How it feels" },
      {
        type: "p",
        text: "You used to play with numbers. Discounts, running totals, quick sums — effortless, almost enjoyable. Now even holding a single number in your head feels slippery. You open the calculator for fifteen percent of forty. And somewhere underneath, a quieter worry: am I losing it? Is this how decline begins?",
      },
      { type: "h2", text: "The truth" },
      {
        type: "p",
        text: "No. This is not a permanent loss of intelligence. It is the meeting of three ordinary things: sleep debt, an overloaded working memory, and neglected circuits.",
      },
      {
        type: "p",
        text: "Working memory is your mental workbench. Doing arithmetic in your head means holding numbers on that bench, performing operations, and keeping track of partial results — all in a space with very few slots. Today that bench is covered. Notifications, half-finished tasks, background anxiety. There is no room left to set the numbers down.",
      },
      {
        type: "p",
        text: "Sleep matters because deep sleep rehearses and strengthens the exact circuits you used during the day, arithmetic among them. Skip it, and yesterday's practice never consolidates; today the circuit is weaker than it was.",
      },
      {
        type: "p",
        text: "And the brain is stingy with energy. What is not used is pruned. If a calculator has done your thinking for three years, the network has thinned — not died. It rebuilds at any age.",
      },
      { type: "h2", text: "The reclamation protocol" },
      {
        type: "list",
        items: [
          "Fix sleep first, for one week. No amount of practice sticks on a sleep-deprived brain. Track the hours; do not judge them yet.",
          "Clear the workbench. For thirty minutes before any thinking that matters, put the phone in another room and close every tab. Your mind needs empty space more than it needs technique.",
          "Take tiny wins daily. Estimate the discount before you check it. Keep a running total while you shop; being a few cents out is fine. Five minutes of a mental-maths app in the morning.",
          "Relearn multimodally. Run your times tables in the shower. Visualise the digits, say them aloud. Seeing, hearing and speaking together encodes far better than reading alone.",
          "Take the two-week challenge. Each day, one problem slightly harder than yesterday's — 17 × 24, then check. You will be surprised how fast the old pathways answer.",
        ],
      },
      {
        type: "quote",
        text: "The first attempts will feel painfully slow. That is not failure. That is the circuit being dusted off.",
      },
      {
        type: "p",
        text: "Give it three weeks of small, boring, daily contact. Then look back at week one. The fog does not lift all at once; it thins, and one morning you notice you did the sum before you reached for the phone.",
      },
    ],
  },
  {
    slug: "five-pages-a-day",
    title: "Five pages a day",
    em: "is not a small thing.",
    dek: "How to start reading again when you cannot hold a page — and why the number has to be embarrassingly low.",
    readingTime: "5 min",
    section: "Mind",
    date: "2026",
    blocks: [
      { type: "h2", text: "The itch" },
      {
        type: "p",
        text: "You open the book, read four sentences, and your hand moves toward the phone before you have decided anything. This is not weakness of character. It is a reward system that has been trained, thousands of times a day, to expect something new every few seconds.",
      },
      { type: "h2", text: "Why five" },
      {
        type: "p",
        text: "Because five pages is below the threshold where resistance appears. A chapter is a negotiation. Five pages is not worth arguing with, so you do it — and doing it is the entire mechanism. You are not trying to finish a book this month. You are collecting evidence that you are a person who reads.",
      },
      { type: "h2", text: "The conditions" },
      {
        type: "list",
        items: [
          "A physical book. Screens carry the expectation of escape.",
          "The phone in a different room. Face-down on the table is still in the room.",
          "Something you actually want to read. Duty reading fails in week one.",
          "A pencil in your hand. Underlining keeps the body involved when attention drifts.",
          "The same time each day, attached to something you already do.",
        ],
      },
      {
        type: "p",
        text: "After two weeks the five pages will often become fifteen without you deciding to. Let that happen; do not schedule it. The moment reading becomes a target again, the resistance comes back.",
      },
    ],
  },
  {
    slug: "the-first-week-of-sleep",
    title: "The first week",
    em: "of real sleep.",
    dek: "Before nutrition, before focus training, before anything: seven nights. What to change, in what order, and what to expect.",
    readingTime: "6 min",
    section: "Body",
    date: "2026",
    blocks: [
      { type: "h2", text: "Why this comes first" },
      {
        type: "p",
        text: "Every technique on this site assumes a brain that has been cleaned overnight. During deep sleep, cerebrospinal fluid washes through the tissue and carries away the day's metabolic residue; memories are sorted and filed; emotional regulation resets. Without that, you are practising on a surface that will not hold the practice.",
      },
      { type: "h2", text: "The seven nights" },
      {
        type: "list",
        items: [
          "Choose a wake time and keep it every day, including weekends. This single anchor does more than any supplement.",
          "Get outside within an hour of waking, for ten to thirty minutes, without sunglasses. Morning light sets the clock that decides when melatonin arrives tonight.",
          "Stop caffeine eight hours before bed. If you sleep at eleven, that means nothing after three.",
          "Give the last hour to dim light, warmth and a paper book. A warm shower works because of the temperature drop afterwards.",
          "Keep the room cool, fully dark and quiet. Charge the phone in another room.",
          "If you are awake after twenty minutes, get up. Sit somewhere dim with something dull until sleepy. This protects the association between bed and sleep.",
        ],
      },
      { type: "h2", text: "What to expect" },
      {
        type: "p",
        text: "Nights one to three often feel worse — the fixed wake time creates a debt before it repays one. By night five most people notice mornings that begin without dread. Do not measure clarity yet. Measure only whether you kept the wake time. That is the whole test of week one.",
      },
      {
        type: "p",
        text: "If you have done this honestly for a week and nothing shifts at all, that is real information, and it belongs in front of a doctor. Persistent unrefreshing sleep is how apnea, thyroid problems and anaemia announce themselves.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
