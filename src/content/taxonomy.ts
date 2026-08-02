export type TaxonomyTopic = {
  slug: string;
  title: string;
  feels?: string;
  why?: string[];
  body?: string[];
  steps?: string[];
  islamicView?: string[];
  whenToSeekHelp?: string[];
  relatedLink?: { label: string; to: "/experiences" | "/community" | "/tools" | "/journal" };
};

export type TaxonomyCategory = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  intro: string;
  topics: TaxonomyTopic[];
};

export const taxonomy: TaxonomyCategory[] = [
  {
    slug: "understand",
    name: "Understand Yourself",
    title: "Understand what is happening",
    summary: "Help users identify and validate what they’re experiencing. Not a diagnostic site, but an educational resource.",
    intro: "Before anything can be fixed, it has to be named. This section is a map of the territory you already recognize, written so you can stop wondering whether you are broken.",
    topics: [
      {
        slug: "brain-fog",
        title: "Brain Fog & Cognitive Overload",
        feels: "The world is wrapped in cotton. Thoughts move slowly, words do not come, simple mental arithmetic feels like lifting something heavy. You reread the same paragraph. You forget why you walked into the room.",
        why: [
          "Poor sleep — brain cells never finish clearing the day's metabolic waste.",
          "Chronic stress — sustained cortisol thins connections in the prefrontal cortex.",
          "Nutritional gaps — dehydration, blood sugar crashing.",
          "Digital overstimulation — constant context-switching drains attention."
        ],
        steps: [
          "Commit to 7–9 hours of sleep for seven nights.",
          "Drink 2–3 liters of water a day.",
          "Try 24 hours without social media or news."
        ],
        whenToSeekHelp: [
          "If the fog is new, severe, or accompanied by other physical symptoms.",
          "To rule out medical causes like thyroid issues or vitamin deficiencies."
        ],
        islamicView: [
          "Allah created forgetfulness as a test; starting the day with intentional worship (like Fajr) can improve focus and frame the day.",
          "The Prophet (pbuh) often made dua seeking refuge from laziness and incapacity, acknowledging these human struggles."
        ]
      },
      {
        slug: "burnout",
        title: "Burnout",
        feels: "Exhaustion, cynicism, reduced efficacy. Running on empty, numbness, detachment from who you used to be. Small decisions feel impossible.",
        why: [
          "Excessive workload without adequate recovery.",
          "Lack of control over your work or environment.",
          "The stress response is stuck open — HPA axis dysregulation."
        ],
        steps: [
          "Begin with safety and rest, not productivity. Recovery is not a project to optimize.",
          "Regulate the nervous system daily: slow exhales, grounding, warmth.",
          "Set strict boundaries between work and rest."
        ],
        whenToSeekHelp: [
          "If exhaustion persists despite rest.",
          "If accompanied by deep hopelessness or depression (burnout often overlaps with depression)."
        ],
        islamicView: [
          "Rest is an act of worship when intended to strengthen the body for good deeds.",
          "Recognize the balance (mizan) in life; your body has a right over you, as emphasized in the Sunnah."
        ]
      },
      {
        slug: "trauma-ptsd",
        title: "Trauma & Lived Experience",
        feels: "Re-experiencing events (flashbacks), hyperarousal, avoidance, numbness. The body keeps answering a threat that has passed. Or quieter fractures: growing up too fast, emotional neglect, betrayal, displacement, spiritual wounding — experiences that never got a name until now.",
        why: [
          "Acute events like accidents, violence, or assault — and chronic patterns like parentification, neglect, or gaslighting.",
          "The alarm system (amygdala) stays sensitized, overriding the logical brain.",
          "What was never named still lives in memory, attention, identity, and the body."
        ],
        body: [
          "Clinical labels help professionals. Lived language helps humans. Velorah’s experience map names dozens of shared wounds — childhood adversity, relational rupture, systemic violence, inner crises, faith wounding, and work or purpose collapse — each with a felt sense so you can recognize yourself without a diagnosis.",
          "On Voices, these become soft tags on stories. In Community, they become Support Circles by theme. In the Library, they grow into guides. Start with the map when you need words; stay with a circle when you need witnesses."
        ],
        steps: [
          "Open the Lived Experiences map and find the language that fits — not every wound needs a clinical name.",
          "Practice grounding when the body is loud (e.g., 5-4-3-2-1 sensory method).",
          "Ensure physical and emotional safety first; then connect with safe people or a moderated circle.",
          "If a story or tag overwhelms you, pause. Use content warnings. Seek crisis help when needed."
        ],
        whenToSeekHelp: [
          "If symptoms last longer than 1 month or severely impair daily life.",
          "Seek trauma-focused CBT or EMDR (highly recommended by WHO).",
          "If you are in crisis or thinking of harming yourself, contact emergency or crisis services immediately — this site cannot replace that care."
        ],
        islamicView: [
          "Hardship is acknowledged in revelation; seeking healing (including professional care) is not a weakness of faith.",
          "Being witnessed with dignity — without comparison of pain — reflects the mercy we owe one another."
        ],
        relatedLink: {
          label: "Open the Lived Experiences atlas",
          to: "/experiences",
        },
      },
      {
        slug: "anxiety",
        title: "Anxiety & Panic",
        feels: "Heart racing, sweating, racing thoughts, a sense of impending doom. Hypervigilance from stress can mimic anxiety.",
        why: [
          "Overactive fight-or-flight response.",
          "Excessive focus on future 'what-ifs'."
        ],
        steps: [
          "Box breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s.",
          "Mindfulness: stay present in the current moment without judgment."
        ],
        whenToSeekHelp: [
          "If anxiety prevents daily tasks or becomes chronic.",
          "If you experience frequent, debilitating panic attacks."
        ]
      }
    ]
  },
  {
    slug: "rebuild",
    name: "Rebuild Your Brain",
    title: "Rebuild the hardware",
    summary: "Evidence-based interventions to improve cognitive health and resilience.",
    intro: "This is the unglamorous foundation. Every cognitive technique fails on a body that has not slept, has not eaten, and has not moved.",
    topics: [
      {
        slug: "sleep",
        title: "Sleep — The Great Cleaner",
        why: [
          "Crucial for memory consolidation and toxin removal (glymphatic system).",
          "Sleep deprivation impairs attention, reaction time, and working memory.",
          "Chronic poor sleep lowers BDNF and IGF-1 (key for neuroplasticity)."
        ],
        steps: [
          "Set a consistent bedtime and wake time.",
          "Keep the bedroom dark, cool, and quiet.",
          "Avoid caffeine after noon and screens 1-2 hours before bed.",
          "Get morning sunlight to set your circadian rhythm."
        ],
        whenToSeekHelp: [
          "If insomnia persists for more than 2 weeks.",
          "Consider CBT-I (Cognitive Behavioral Therapy for Insomnia)."
        ],
        islamicView: [
          "Recite protective duas (like Ayat al-Kursi) or short Quranic verses to calm the mind before sleep.",
          "Following the Sunnah of sleeping early and waking for Tahajjud or Fajr provides structure and peace."
        ]
      },
      {
        slug: "exercise",
        title: "Exercise & Movement",
        why: [
          "Boosts brain function via BDNF and blood flow.",
          "Aerobic exercise raises BDNF, IGF-1, and increases gray matter.",
          "Reduces stress hormones (cortisol) and inflammation."
        ],
        steps: [
          "Aim for 3–5 days/week of moderate exercise (e.g., brisk walking).",
          "Even a 20-minute walk boosts mood and alertness.",
          "Include resistance training 2-3 times a week."
        ]
      },
      {
        slug: "nutrition",
        title: "Nutrition for a Working Mind",
        why: [
          "The brain needs healthy fats (omega-3s), complex carbs, and micronutrients.",
          "Deficiencies in B12, iron, and Vitamin D impair focus."
        ],
        steps: [
          "Emphasize a Mediterranean-style diet (vegetables, fruits, nuts, fish, olive oil).",
          "Hydrate well—even mild dehydration impairs attention.",
          "Avoid excessive sugar and energy drinks."
        ]
      },
      {
        slug: "attention",
        title: "Attention (Focus) Training",
        why: [
          "Modern life overloads dopamine; constant novelty trains us to need quick rewards.",
          "Sustained attention is a skill that must be practiced."
        ],
        steps: [
          "Set specific non-phone work blocks (deep work).",
          "Use the Pomodoro technique (25 min focus, 5 min break).",
          "Turn off notifications and practice single-tasking."
        ]
      }
    ]
  },
  {
    slug: "daily",
    name: "Daily Recovery",
    title: "Structure the day",
    summary: "Convert interventions into daily routines. Small habits accumulate.",
    intro: "A foggy mind cannot supply motivation. The routine has to be small enough to run without any willpower. Focus on time-of-day structures.",
    topics: [
      {
        slug: "morning",
        title: "Morning Routine",
        why: [
          "Sets the circadian rhythm and tone for the day."
        ],
        steps: [
          "Wake at a consistent time.",
          "Get sunlight exposure within 30 minutes.",
          "Hydrate with water first.",
          "Spend 5-10 minutes journaling or planning 1-3 top priorities."
        ]
      },
      {
        slug: "workday",
        title: "Workday Structure",
        steps: [
          "Schedule 90-minute uninterrupted deep work blocks.",
          "Take lunch away from screens.",
          "Schedule 'buffer times' between tasks to avoid context-switching penalties."
        ],
        islamicView: [
          "Use the 5 daily prayers (Salah) as natural, mindful breaks throughout your workday.",
          "Wudu (ablution) acts as a physical and spiritual refresh between tasks."
        ]
      },
      {
        slug: "evening",
        title: "Evening Routine",
        steps: [
          "Transition away from screens 1-2 hours before bed.",
          "Read a physical book for 20-30 minutes.",
          "Write a 5-minute reflection (gratitude and what you learned).",
          "Plan tomorrow's top tasks."
        ]
      }
    ]
  },
  {
    slug: "emotions",
    name: "Emotion Library",
    title: "Navigate your feelings",
    summary: "Normalize and explain common emotions, with healthy coping strategies.",
    intro: "Emotions are signals, not enemies. Is it OK to feel this way? Yes. Here are healthy ways to respond.",
    topics: [
      {
        slug: "sadness",
        title: "Sadness & Grief",
        feels: "A heavy, lingering sense of loss or emptiness.",
        steps: [
          "Express it through talking, writing, or art.",
          "Find small pleasures and give time permission to heal."
        ],
        whenToSeekHelp: [
          "If grief is prolonged, intense, or accompanied by suicidal thoughts."
        ],
        islamicView: [
          "Grief is natural—even the Prophet (pbuh) cried. The Qur’an acknowledges loss but assures mercy.",
          "Offer Sadaqah (charity) in honor of the deceased for solace.",
          "Find peace in Tawakkul (trust in God) and the promise of reunion in the Hereafter."
        ]
      },
      {
        slug: "anger",
        title: "Anger",
        feels: "Heat, tension, a valid response to injustice or pain.",
        steps: [
          "Find healthy physical outlets (exercise).",
          "Talk it out when calm; pause before reacting."
        ]
      }
    ]
  },
  {
    slug: "faith",
    name: "Faith & Meaning",
    title: "Find strength in your",
    summary: "Integrate Islamic spirituality into your recovery journey for meaning and resilience.",
    intro: "Faith is woven throughout recovery. Believers are tested, but solace is found through worship. Here we explore how Islamic practices complement evidence-based mental health care.",
    topics: [
      {
        slug: "faith-and-wellness",
        title: "Faith & Mental Health",
        why: [
          "A misconception exists that seeking therapy means weak faith.",
          "The Prophet (pbuh) consulted healers, and scholars like Ibn al-Qayyim wrote extensively on treating emotional ailments."
        ],
        steps: [
          "Practice gratitude journaling (Shukr) to combat negative thinking.",
          "Make constant Dua for healing, knowing Allah hears you.",
          "Join a mosque community for social support and shared spiritual goals."
        ],
        islamicView: [
          "Submission (Taslim) to Divine decree shifts perspective from 'Why me?' to hopeful resilience.",
          "Seeking medical treatment is supported by the hadith: 'For every disease there is a cure'."
        ]
      },
      {
        slug: "spiritual-routines",
        title: "Healing Spiritual Routines",
        steps: [
          "Tahajjud (prayer at dawn) improves discipline & calm in the quietest hours.",
          "Dhikr (remembrance) actively reduces anxiety and grounds the mind.",
          "Participating in community events (like breaking fast) provides vital social scaffolding."
        ]
      }
    ]
  }
];

export function getCategory(slug: string) {
  return taxonomy.find((c) => c.slug === slug);
}
