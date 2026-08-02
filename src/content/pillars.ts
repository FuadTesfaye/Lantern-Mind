export type PillarSection = {
  title: string;
  feels?: string;
  why?: string[];
  body?: string[];
  steps?: string[];
};

export type Pillar = {
  slug: string;
  numeral: string;
  name: string;
  title: string;
  em: string;
  summary: string;
  intro: string;
  sections: PillarSection[];
};

export const pillars: Pillar[] = [
  {
    slug: "understand",
    numeral: "I",
    name: "Understand",
    title: "Understand what is happening",
    em: "inside you.",
    summary:
      "Brain fog, memory loss, collapsed attention, burnout. What each one feels like, why it happens, and the first honest step.",
    intro:
      "Before anything can be fixed it has to be named. Nothing in this section is a diagnosis — it is a map of the territory you already recognise, written so you can stop wondering whether you are broken.",
    sections: [
      {
        title: "Brain fog",
        feels:
          "The world is wrapped in cotton. Thoughts move slowly, words do not come, simple mental arithmetic feels like lifting something heavy. You reread the same paragraph. You forget why you walked into the room. It is as if your mind is underwater.",
        why: [
          "Poor sleep — brain cells never finish clearing the day's metabolic waste.",
          "Chronic stress — sustained cortisol thins connections in the prefrontal cortex and over-tunes the amygdala.",
          "Nutritional gaps — B12, vitamin D, iron, omega-3, dehydration, blood sugar crashing after refined carbohydrate.",
          "Digital overstimulation — constant context-switching drains the reward system until attention cannot be sustained.",
          "Mental health — depression, anxiety, burnout, PTSD and ADHD all surface as fog.",
          "Medical causes — thyroid disorders, autoimmune conditions, inflammation, sleep apnea, post-viral syndromes.",
        ],
        steps: [
          "Commit to 7–9 hours of sleep for seven nights and note any change.",
          "Drink 2–3 litres of water a day.",
          "Cut sugar and ultra-processed food for one week.",
          "Book a basic medical check-up: blood panel, thyroid, vitamin levels.",
          "Try twenty-four hours without social media, news or gaming, to find your real attention baseline.",
        ],
      },
      {
        title: "Memory that slips",
        feels:
          "You cannot hold numbers in your head the way you used to. Names go. Tasks go. Things you learned an hour ago go. And quietly it frightens you — you wonder whether you are losing your intelligence.",
        why: [
          "Memory is not one thing. It is a exchange between the hippocampus, the prefrontal cortex and the emotional centres, and fog interrupts the exchange.",
          "Deep sleep and REM are when memories are consolidated. Without them, nothing sticks.",
          "Cortisol blocks retrieval — the memory is there, the door is jammed.",
          "If attention never encoded it, there is nothing to retrieve. Distraction is the real thief.",
          "Circuits you never use get pruned. Skill fades from disuse, not from damage.",
        ],
        steps: [
          "Rebuild sleep first — nothing else holds without it.",
          "Practise retrieval, not rereading: close the book and say it back.",
          "Use spaced repetition for anything factual.",
          "Do a few minutes of mental arithmetic daily.",
          "Journal at night — writing the day down is a second consolidation.",
        ],
      },
      {
        title: "Attention span collapse",
        feels:
          "Your mind is a browser with fifty tabs open. A page of a book, and the itch arrives. Deep work feels not difficult but impossible, as if the capacity has been removed.",
        why: [
          "Short video, feeds and notifications deliver instant, variable rewards every few seconds.",
          "The reward circuit adapts and begins to read sustained focus as boring — an unbearable flatness.",
          "This is not a character flaw. It is a neurochemical arrangement, and arrangements can be changed.",
        ],
        steps: [
          "Twenty-five minutes, one task, phone in another room. That is the whole practice.",
          "Rebuild in blocks, not in heroics: three cycles is a full day's training at first.",
          "Redesign the environment so focus is the path of least resistance.",
        ],
      },
      {
        title: "Burnout, trauma and emotional exhaustion",
        feels:
          "Running on empty. Numbness, cynicism, chronic fatigue, detachment from who you used to be. Even small decisions feel impossible.",
        why: [
          "The stress response is stuck open — HPA axis dysregulation after too long in fight-or-flight.",
          "You have been giving more than you have received, for longer than is survivable.",
          "In trauma, the alarm system stays sensitised; the body keeps answering a threat that has passed.",
        ],
        steps: [
          "Begin with safety and rest, not productivity. Recovery is not a project to optimise.",
          "Regulate the nervous system daily: slow exhales, grounding, warmth, being outdoors.",
          "For trauma, seek trauma-informed professional help — EMDR, somatic work. This is the right use of help, not a last resort.",
        ],
      },
      {
        title: "A note on ADHD versus acquired symptoms",
        body: [
          "True ADHD is neurodevelopmental. It is lifelong, present in childhood, and visible across settings — not something that begins at twenty-six after a hard year.",
          "Modern life, though, can produce a convincing imitation in anyone: fragmented attention, restlessness, unfinished tasks, a mind that will not settle. The tools overlap heavily, which is why this site's practices help either way.",
          "Only a clinician can tell you which you are living with. If the pattern goes back as far as you can remember, that is worth an evaluation — a name can lift years of self-blame.",
        ],
      },
    ],
  },
  {
    slug: "body",
    numeral: "II",
    name: "Body",
    title: "Rebuild the hardware",
    em: "before the software.",
    summary:
      "Sleep, food and movement. No clarity of mind survives a body that is never repaired.",
    intro:
      "This is the unglamorous foundation. Every cognitive technique in the next section fails on a body that has not slept, has not eaten, and has not moved. Start here even if it feels too simple.",
    sections: [
      {
        title: "Sleep — the great cleaner",
        body: [
          "While you sleep, brain cells shrink to let cerebrospinal fluid wash through and carry away the proteins that accumulate during waking hours. The day's memories are sorted, the useless discarded, the important reinforced. Deep sleep is also where emotional regulation resets.",
          "You cannot think your way past sleep debt. It is the one input with no substitute.",
        ],
        steps: [
          "Fix your wake time — the same seven days a week, weekends included.",
          "Get 10–30 minutes of morning sunlight within an hour of waking, without sunglasses.",
          "Wind down: no screens for the last hour or two, dim light, a warm shower, a physical book that is not stressful.",
          "Keep the room cool (18–20°C), fully dark, quiet or with steady white noise.",
          "No caffeine after 2pm, or at least eight hours before bed.",
          "If sleep does not come within twenty minutes, get up. Sit in dim light with a dull book until you are sleepy. This breaks the association between the bed and frustration.",
        ],
      },
      {
        title: "Nutrition for a working mind",
        body: [
          "The brain is roughly two percent of your body and takes about twenty percent of your energy. It wants a steady supply, not spikes and crashes.",
          "Ninety percent of the body's serotonin is made in the gut, which is why fibre, fermented foods and real meals change mood more reliably than most supplements.",
        ],
        steps: [
          "Protein at every meal — amino acids are the raw material for dopamine and serotonin.",
          "Omega-3 fats: oily fish, walnuts, flaxseed. They are structural, not optional.",
          "Slow carbohydrate: vegetables, legumes, whole grains. Skip the white bread and sweet drinks.",
          "Hydrate — two percent dehydration is already measurable in cognition.",
          "Ask your doctor about B12, vitamin D, magnesium and iron rather than guessing with supplements.",
        ],
      },
      {
        title: "Movement — fertiliser for the brain",
        body: [
          "Aerobic movement raises BDNF, a protein that behaves like fertiliser for neurons: new cells in the hippocampus, stronger connections everywhere. It also simply moves more oxygenated blood through a tired brain.",
          "You do not need an athletic programme. You need repetition.",
        ],
        steps: [
          "Thirty minutes of brisk walking daily, as a floor rather than a goal.",
          "Three or four times a week, something that raises your heart rate properly.",
          "A ten-minute walk after meals steadies glucose and clears the head.",
          "Walk without headphones sometimes. Let the mind wander, or practise mental arithmetic while you go.",
        ],
      },
    ],
  },
  {
    slug: "mind",
    numeral: "III",
    name: "Mind",
    title: "Train the mind you",
    em: "are missing.",
    summary:
      "Reading, chess, mental arithmetic, memory work — and, clearly marked, the practices of faith and meaning.",
    intro:
      "These are the skills you grieve. They are recoverable. Each one below is chosen because it demands sustained, single-threaded attention — the exact thing modern life removed.",
    sections: [
      {
        title: "Reading — rebuilding deep attention",
        body: [
          "A physical book demands linear, sustained attention. It is the direct antidote to fragmentary reading, and it rebuilds vocabulary, empathy, and the capacity to follow a long argument to its end.",
        ],
        steps: [
          "Start with five pages a day. Not a chapter. Five pages.",
          "Read what you genuinely enjoy, not what you think you should read.",
          "Leave the phone in another room — in sight is the same as in hand.",
          "Underline with a pencil; marking engages more of the brain than passing your eyes over the words.",
          "Grow to twenty or thirty minutes over a few weeks, no faster.",
        ],
      },
      {
        title: "Chess and strategy",
        body: [
          "Chess trains working memory (holding a position in your head), executive function (planning, weighing consequences, resisting the fast bad move), pattern recognition, and — quietly — emotional regulation. You learn to sit with pressure and to lose without collapse.",
        ],
        steps: [
          "Ten to fifteen minutes of tactics puzzles daily beats one long game.",
          "Analyse your games yourself before turning on the engine. The unaided search is the training.",
          "Treat it as a mindfulness practice: only the board, no music, no second screen.",
        ],
      },
      {
        title: "Mental arithmetic and memory work",
        steps: [
          "Do the sums in your head while shopping: discounts, running totals, tips.",
          "Memorise something real — a verse, a poem, a list of dates — using the memory palace technique.",
          "Try dual n-back a few minutes a day if you like being uncomfortable.",
          "Use spaced repetition for facts; it works with the forgetting curve rather than against it.",
        ],
        body: [
          "The point is not to become a calculator. It is to give the workbench of your working memory something to hold, daily, until holding is easy again.",
        ],
      },
      {
        title: "Faith and meaning",
        body: [
          "Clearly marked, and entirely optional. Read it if it is yours; skip it without loss if it is not.",
          "In an Islamic frame: salah performed with khushu' is sustained single-object attention, five times a day — the precise opposite of scattered scrolling. The postures and measured recitation engage the parasympathetic system and lower physiological arousal. Dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar — works as a grounding repetition. Recitation of the Qur'an has been studied for its effect on anxiety, through sound, rhythm and meaning together. And praying for clarity externalises the burden: you are no longer fighting alone.",
          "If your focus in prayer is weak, that is a tired mind, not a failing soul. Begin by learning the meaning of what you recite, word by word.",
          "For a universal audience the same functions are served by seated meditation, gratitude writing, time in nature, and any practice that returns attention to one thing on purpose. The principle is the anchor; the form is yours.",
        ],
        steps: [
          "Use fixed prayer or practice times as anchors — the moments you detach from screens.",
          "Morning and evening remembrance as a fixed mental reset.",
          "One thing at a time, on purpose, without a second screen. That is the whole technology.",
        ],
      },
    ],
  },
  {
    slug: "rhythm",
    numeral: "IV",
    name: "Rhythm",
    title: "Structure the day so it",
    em: "carries you.",
    summary:
      "A minimum viable routine, an environment that helps, and habits built on identity rather than willpower.",
    intro:
      "A foggy mind cannot supply motivation. So the routine has to be small enough to run without any. Everything here is designed for the version of you that has nothing left to give.",
    sections: [
      {
        title: "The minimum viable routine",
        body: [
          "Morning, before the phone: wake, drink a full glass of water, five minutes of slow breathing or prayer, ten minutes of light outside or by a window, ten minutes of easy movement. Then — and only then — pick up the phone, for a reason.",
          "Work block: a timer for twenty-five minutes, one task, phone off. Five minutes away from screens: window, breath, stretch. After three or four cycles, a longer rest. This is focus training disguised as work.",
          "Evening: last meal two to three hours before bed, twenty minutes with a physical book, a written brain-dump of every worry plus three things you are grateful for, a moment of prayer or reflection, a consistent bedtime.",
        ],
      },
      {
        title: "Environment design",
        steps: [
          "Set your phone to greyscale — colour is half the pull.",
          "Delete the apps that take time; keep them on desktop only if you truly need them.",
          "Charge the phone outside the bedroom. The alarm can be a clock.",
          "Build one uncluttered corner for deep work: good light, a plant, a chair you can sit in for an hour.",
        ],
      },
      {
        title: "Habits, built on identity",
        body: [
          "Do not aim at goals — 'I will read twenty books' collapses on the first bad week. Aim at identity: 'I am someone who reads every day.' The evidence for the identity is what you are collecting, and two minutes counts as evidence.",
        ],
        steps: [
          "The two-minute rule: the starting version of any habit takes under two minutes.",
          "Habit stacking: after [something you already do], I will [the tiny new thing].",
          "Never miss twice. One missed day is noise; two is the beginning of a new pattern.",
        ],
      },
    ],
  },
  {
    slug: "connection",
    numeral: "V",
    name: "Connection",
    title: "Come back to yourself,",
    em: "and to others.",
    summary:
      "Self-compassion, learning to feel again, honest communication, and the antidote to isolation.",
    intro:
      "Chronic loneliness carries a mortality risk comparable to heavy smoking. The brain is built for company, and isolation deepens every symptom in the first pillar. This is not the soft part of recovery; it is load-bearing.",
    sections: [
      {
        title: "Self-compassion",
        body: [
          "The research here is unambiguous: people who treat themselves as they would treat a struggling friend recover faster than people who drive themselves with contempt. Self-criticism feels like standards. It is just another stressor, applied from inside.",
        ],
        steps: [
          "Write yourself the letter you would write to a friend in exactly your position.",
          "Name the feeling plainly — 'this is exhaustion', 'this is shame' — before trying to solve it.",
          "Notice that suffering like yours is common. That is not a demotion; it is company.",
        ],
      },
      {
        title: "Learning to feel again",
        body: [
          "Numbness does not lift through thinking. It lifts through the senses. Cook something that takes time. Walk barefoot. Listen to instrumental music with your eyes closed. Make something badly with your hands.",
        ],
      },
      {
        title: "Reaching people",
        steps: [
          "Schedule a ten-minute call with someone you trust, especially when you do not feel like it.",
          "Choose shared attention over small talk: a chess club, a reading circle, a study group.",
          "Be honestly vulnerable with one safe person. 'Me too' dissolves more shame than any argument.",
          "Serve someone. Helping turns the gaze outward, and perspective is itself a treatment.",
        ],
      },
    ],
  },
  {
    slug: "tools",
    numeral: "VI",
    name: "Tools",
    title: "Small instruments for",
    em: "the long walk.",
    summary:
      "A focus timer, self-assessment guidance, a habit tracker and a fog journal — plain, free, and yours.",
    intro:
      "None of these are clever. They exist so that the work has somewhere to happen. Use one; ignore the rest until you need them.",
    sections: [
      {
        title: "Self-assessment, honestly framed",
        body: [
          "There are well-validated questionnaires used in clinics: PHQ-9 for depression, GAD-7 for anxiety, ASRS for adult ADHD, the Maslach inventory for burnout, and sleep quality indices. They are worth knowing about.",
          "This site will not score you. A number generated in a browser cannot see you, and a bad score read alone at 2am helps nobody. What these instruments are genuinely good for is preparing you to be heard: print one, answer it honestly, and take the answers to a clinician who can interpret them.",
          "If any question about self-harm resonates, do not wait for a form. Contact a doctor or a crisis line today.",
        ],
      },
      {
        title: "The fog journal",
        body: [
          "One line a day, at the same time each day. Sleep hours, what you ate, stress out of ten, clarity out of ten, and one sentence about the day. After three weeks you will have something no article can give you: your own pattern, in your own handwriting.",
        ],
      },
      {
        title: "The habit tracker",
        body: [
          "Three habits maximum. A row per habit, a column per day, a mark or nothing. The goal is not a perfect grid — it is to make the chain visible enough that you would rather not break it.",
        ],
      },
    ],
  },
];

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}
