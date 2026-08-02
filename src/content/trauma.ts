/**
 * Lived-experience taxonomy for Lantern-Mind.
 * These are not diagnostic boxes — they name shared human experiences
 * so a visitor can think: “Yes. That’s exactly what happened to me.”
 */

export type TraumaExperience = {
  slug: string;
  title: string;
  /** Shorter warm label for story tags / filters */
  tag: string;
  feeling: string;
  /** Show content-warning treatment + crisis link emphasis */
  sensitive?: boolean;
};

export type TraumaDomain = {
  slug: string;
  letter: string;
  name: string;
  summary: string;
  experiences: TraumaExperience[];
};

export type SupportCircle = {
  slug: string;
  title: string;
  description: string;
  /** Experience slugs this circle gathers */
  related: string[];
};

export type StorySeed = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
};

export const traumaIntro = {
  eyebrow: "Lived Experiences",
  titleLead: "The words you may have been",
  titleEm: "looking for.",
  body: "These aren’t diagnostic boxes. They are shared human experiences that can fracture memory, attention, and identity. The goal is that someone visiting can think: “Yes — that’s exactly what happened to me. I didn’t have the words.”",
};

export const traumaDomains: TraumaDomain[] = [
  {
    slug: "childhood",
    letter: "A",
    name: "Childhood Adversity & Family Wounds",
    summary:
      "What happened in the house you grew up in — the roles you were given, the needs that went unmet, the fear that never fully left.",
    experiences: [
      {
        slug: "parentification",
        title: "Parentification (The Child Who Became the Adult)",
        tag: "Parentification",
        feeling:
          "You grew up too fast. You were the emotional caretaker of a parent, the translator for your family, the one who held everything together. You never got to be a child.",
      },
      {
        slug: "emotional-neglect",
        title: "Emotional Neglect",
        tag: "Emotional Neglect",
        feeling:
          "Your physical needs were met, but no one asked how you felt. You learned early that your emotions were a burden. You became invisible.",
      },
      {
        slug: "physical-emotional-abuse",
        title: "Physical & Emotional Abuse",
        tag: "Abuse",
        feeling:
          "Home was unpredictable. You learned to read footsteps and tone of voice to stay safe. Your nervous system has never fully relaxed.",
        sensitive: true,
      },
      {
        slug: "witnessing-domestic-violence",
        title: "Witnessing Domestic Violence",
        tag: "Witnessing Violence",
        feeling:
          "You saw someone you love get hurt, and you couldn’t stop it. You carry a weight of helplessness and hypervigilance.",
        sensitive: true,
      },
      {
        slug: "parental-loss-abandonment",
        title: "Parental Loss, Abandonment, or Absence",
        tag: "Absent Parent",
        feeling:
          "Through death, divorce, prison, or emotional distance, the person who was supposed to protect you wasn’t there. You may now struggle to trust that love will stay.",
      },
      {
        slug: "family-addiction",
        title: "Growing Up With Addiction in the Family",
        tag: "Family Addiction",
        feeling:
          "You learned inconsistency. Promises were broken. You may have taken on responsibility too early, or you feel an underlying sense of chaos.",
      },
      {
        slug: "perfect-child-pressure",
        title: "Being the “Perfect Child” / Pressure to Excel",
        tag: "Pressure to Excel",
        feeling:
          "Your worth depended on your grades, your behavior, your achievements. Failure felt like annihilation. You may now struggle with perfectionism and burnout.",
      },
      {
        slug: "sibling-comparison",
        title: "Being Compared to Siblings / The Forgotten One",
        tag: "The Forgotten One",
        feeling:
          "You were measured against someone else and always came up short — or you were the one no one worried about. You learned to disappear.",
      },
      {
        slug: "poverty-instability",
        title: "Growing Up in Poverty / Financial Instability",
        tag: "Economic Hardship",
        feeling:
          "You worried about money before you could even count it. You felt shame about clothes, food, school fees. The stress may still live in your body.",
      },
      {
        slug: "family-separation-migration",
        title: "Family Separation / Migration / Displacement",
        tag: "Displacement",
        feeling:
          "Your family scattered across countries. You said goodbye too many times. Home is a fractured concept.",
      },
    ],
  },
  {
    slug: "relational",
    letter: "B",
    name: "Relational & Intimate Trauma",
    summary:
      "Wounds that arrive through love, trust, and closeness — when the people meant to hold you instead reshape how safe the world feels.",
    experiences: [
      {
        slug: "betrayal",
        title: "Betrayal by a Loved One",
        tag: "Betrayal",
        feeling:
          "Someone you trusted completely — a partner, a close friend — broke that trust. It didn’t just hurt; it made you question your own judgment.",
      },
      {
        slug: "toxic-relationship",
        title: "Toxic Relationship / Emotional Manipulation",
        tag: "Toxic Relationship",
        feeling:
          "You were slowly convinced that your feelings were wrong, your memory was faulty, your needs were excessive. You lost yourself trying to keep the peace.",
      },
      {
        slug: "gaslighting",
        title: "Gaslighting",
        tag: "Gaslighting",
        feeling:
          "You started wondering if you were crazy. Reality felt slippery. Even after leaving, you might still doubt your own perceptions.",
      },
      {
        slug: "abandonment-rejection",
        title: "Abandonment & Rejection",
        tag: "Abandonment",
        feeling:
          "Someone left, and it confirmed your deepest fear: that you’re not worth staying for. This can manifest as clinging or pushing people away first.",
      },
      {
        slug: "divorce-family-breakdown",
        title: "Divorce / Family Breakdown",
        tag: "Family Breakdown",
        feeling:
          "The life you thought was permanent collapsed. Whether you were a child or an adult, it reshaped your sense of security and identity.",
      },
      {
        slug: "cheated-on",
        title: "Being Cheated On",
        tag: "Infidelity",
        feeling:
          "The betrayal sits in your body. Comparison, intrusive thoughts, and a shattered sense of self-worth.",
      },
      {
        slug: "losing-best-friend",
        title: "Losing a Best Friend",
        tag: "Friendship Loss",
        feeling:
          "A platonic breakup can be as devastating as a romantic one — yet often dismissed. You grieve the one who knew everything.",
      },
      {
        slug: "fear-of-intimacy",
        title: "Fear of Intimacy",
        tag: "Fear of Intimacy",
        feeling:
          "You long for closeness but panic when it gets real. You may have been hurt too deeply before, and your system now protects you by keeping distance.",
      },
    ],
  },
  {
    slug: "systemic",
    letter: "C",
    name: "Violence, Displacement & Systemic Trauma",
    summary:
      "Experiences that strip safety from the body and the world — conflict, assault, incarceration, housing loss, and the long aftershocks they leave.",
    experiences: [
      {
        slug: "war-conflict",
        title: "War & Conflict Survivor",
        tag: "War & Conflict",
        feeling:
          "Sounds, sirens, sudden noises still trigger you. You know what it is to have your safety completely stripped away.",
        sensitive: true,
      },
      {
        slug: "refugee-asylum",
        title: "Refugee / Asylum Seeker Journey",
        tag: "Refugee Journey",
        feeling:
          "You left everything behind. The journey itself may have been traumatic, and you may now carry survivor’s guilt and a constant sense of not fully belonging anywhere.",
      },
      {
        slug: "physical-assault",
        title: "Physical Assault",
        tag: "Physical Assault",
        feeling:
          "Your body doesn’t feel like your own. You may feel dirty, angry, afraid, or dissociated. The world no longer feels safe.",
        sensitive: true,
      },
      {
        slug: "sexual-abuse-assault",
        title: "Sexual Abuse / Assault",
        tag: "Sexual Violence",
        feeling:
          "Profound violation. Shame that doesn’t belong to you but clings anyway. It may affect intimacy, trust, and body image for years.",
        sensitive: true,
      },
      {
        slug: "witnessing-violence-death",
        title: "Witnessing Violence or Death",
        tag: "Witnessing Death",
        feeling:
          "You have images in your mind that don’t fade. You may feel disconnected from people who haven’t seen what you’ve seen.",
        sensitive: true,
      },
      {
        slug: "incarceration",
        title: "Incarceration (Self or Family Member)",
        tag: "Incarceration",
        feeling:
          "The shame and separation. You may feel you missed out on life, or you carry the stigma of a loved one’s actions.",
      },
      {
        slug: "homelessness",
        title: "Homelessness / Housing Insecurity",
        tag: "Housing Insecurity",
        feeling: "The ground never felt solid. You learned survival mode as a baseline state.",
      },
    ],
  },
  {
    slug: "inner-crises",
    letter: "D",
    name: "Mental Health & Inner Crises",
    summary:
      "When the storm is inside — depression, anxiety, cognitive grief, burnout, addiction, and the quiet collapse of a sense of self.",
    experiences: [
      {
        slug: "deep-depression",
        title: "Deep Depression / The Void",
        tag: "Depression",
        feeling:
          "Not sadness — absence. The color drained from life. You may have felt you’d never feel anything again.",
      },
      {
        slug: "anxiety-took-over",
        title: "Anxiety That Took Over Your Life",
        tag: "Anxiety",
        feeling:
          "A constant hum of dread. Panic attacks, racing heart, feeling like you’re dying or losing control.",
      },
      {
        slug: "brain-fog",
        title: "Brain Fog / Cognitive Decline",
        tag: "Brain Fog",
        feeling:
          "You were once sharp. Now your mind feels wrapped in cotton. You forget words, lose your train of thought, and fear you’re losing your intelligence.",
      },
      {
        slug: "burnout-collapse",
        title: "Burnout / Collapse",
        tag: "Burnout",
        feeling:
          "You gave everything until there was nothing left. Getting out of bed became a victory. You once cared deeply; now you feel nothing.",
      },
      {
        slug: "feeling-numb",
        title: "Feeling Numb / Disconnected",
        tag: "Numbness",
        feeling:
          "The world is behind glass. You go through motions but feel profoundly alone. You may not even remember how to cry.",
      },
      {
        slug: "identity-crisis",
        title: "Identity Crisis / Who Am I?",
        tag: "Identity Crisis",
        feeling:
          "The old labels don’t fit. You don’t recognize yourself in the mirror. This can be terrifying but also the beginning of something true.",
      },
      {
        slug: "suicidal-thoughts",
        title: "Suicidal Thoughts",
        tag: "Suicidal Thoughts",
        feeling:
          "The pain becomes so heavy that disappearing seems like the only peace. This is a place to be witnessed, not fixed.",
        sensitive: true,
      },
      {
        slug: "addiction-recovery",
        title: "Addiction & Recovery",
        tag: "Addiction & Recovery",
        feeling:
          "Something outside you became the only way to soothe the inside. It worked until it didn’t. You may be fighting to reclaim your life.",
      },
      {
        slug: "perfectionism-prison",
        title: "Perfectionism That Became a Prison",
        tag: "Perfectionism",
        feeling:
          "You couldn’t start anything unless it was perfect. The fear of failure paralyzed you. You’ve been exhausted for years.",
      },
      {
        slug: "people-pleasing",
        title: "People-Pleasing / Losing Yourself",
        tag: "People-Pleasing",
        feeling:
          "You said yes to everyone and no to yourself. You don’t even know what you want anymore — only what others need.",
      },
    ],
  },
  {
    slug: "faith",
    letter: "E",
    name: "Faith & Spiritual Wounding",
    summary:
      "When belief itself becomes a site of rupture — loss of faith, return, loneliness in religion, or spirituality that turned into fear.",
    experiences: [
      {
        slug: "losing-faith",
        title: "Losing Faith / Spiritual Crisis",
        tag: "Spiritual Crisis",
        feeling:
          "The ground of your beliefs crumbled. You may have felt betrayed by God, your community, or your own understanding.",
      },
      {
        slug: "returning-to-faith",
        title: "Returning to Faith / Conversion",
        tag: "Returning to Faith",
        feeling:
          "You came home, but it wasn’t easy. Family rejection, identity reconstruction, fear of not being “good enough” — and immense, quiet hope.",
      },
      {
        slug: "religious-loneliness",
        title: "Religious Loneliness",
        tag: "Religious Loneliness",
        feeling:
          "You believe, but you can’t find your people. You pray alone, struggle alone, and wonder if you’ll ever find a community that feels like home.",
      },
      {
        slug: "spiritual-burnout",
        title: "Spiritual Burnout / Scrupulosity",
        tag: "Spiritual Burnout",
        feeling:
          "Faith became a source of fear, not peace. You obsessed over rules, mistakes, and punishment. Your heart is exhausted.",
      },
    ],
  },
  {
    slug: "work-purpose",
    letter: "F",
    name: "Work, Purpose & Failure",
    summary:
      "Identity wrapped around achievement — and what happens when the career collapses, success feels empty, or money trauma never leaves.",
    experiences: [
      {
        slug: "losing-a-job",
        title: "Losing a Job / Career Collapse",
        tag: "Career Collapse",
        feeling:
          "Your identity was tied to your work. When it vanished, so did you. Shame, anxiety, and the terror of starting over.",
      },
      {
        slug: "impostor-syndrome",
        title: "Impostor Syndrome",
        tag: "Impostor Syndrome",
        feeling:
          "You achieved, but you can’t internalize it. You’re waiting to be “found out.” This keeps you from fully inhabiting your success.",
      },
      {
        slug: "financial-ruin",
        title: "Financial Ruin / Debt",
        tag: "Financial Ruin",
        feeling:
          "Money trauma. Constant panic, sleepless nights, feeling like you’ve failed your family.",
      },
      {
        slug: "empty-success",
        title: "Success That Felt Empty",
        tag: "Empty Success",
        feeling:
          "You got everything you thought you wanted, and you still felt hollow. This can be a uniquely disorienting grief.",
      },
    ],
  },
];

/** Warm, simplified tags used on Voices story tiles (max 3 per story). */
export const storyTagOptions = traumaDomains.flatMap((d) =>
  d.experiences.map((e) => ({
    slug: e.slug,
    label: e.tag,
    domain: d.slug,
    sensitive: Boolean(e.sensitive),
  })),
);

export const supportCircles: SupportCircle[] = [
  {
    slug: "growing-up-too-fast",
    title: "Growing up too fast",
    description:
      "Parentification, eldest-child weight, becoming the family provider before you were ready.",
    related: [
      "parentification",
      "perfect-child-pressure",
      "family-addiction",
      "poverty-instability",
    ],
  },
  {
    slug: "abandoned-or-left-behind",
    title: "Abandoned or left behind",
    description: "Absent parents, rejection, and the fear that love will not stay.",
    related: ["parental-loss-abandonment", "abandonment-rejection", "sibling-comparison"],
  },
  {
    slug: "war-displacement",
    title: "War, displacement, refugee journey",
    description: "Conflict, migration, and the long search for a place that feels like home.",
    related: ["war-conflict", "refugee-asylum", "family-separation-migration"],
  },
  {
    slug: "faith-journey",
    title: "New to faith / Returning to faith",
    description:
      "Conversion, return, spiritual loneliness — and the quiet hope of belonging again.",
    related: ["returning-to-faith", "losing-faith", "religious-loneliness", "spiritual-burnout"],
  },
  {
    slug: "brain-fog-memory",
    title: "Brain fog & memory loss",
    description: "Cognitive grief — when the sharp mind you remember feels wrapped in cotton.",
    related: ["brain-fog", "burnout-collapse", "deep-depression"],
  },
  {
    slug: "burnout-recovery",
    title: "Burnout recovery",
    description: "Collapse after giving everything. Rest without shame. Reclaiming care.",
    related: ["burnout-collapse", "perfectionism-prison", "people-pleasing", "feeling-numb"],
  },
  {
    slug: "grief-loss",
    title: "Grief & loss",
    description: "Death, divorce, friendship endings, and the identities that leave with them.",
    related: ["parental-loss-abandonment", "divorce-family-breakdown", "losing-best-friend"],
  },
];

export const curatedCollections = [
  {
    slug: "growing-up-without-a-father",
    title: "Growing Up Without a Father",
    description: "Absence, becoming a man alone, and the quiet work of ending the cycle.",
    tags: ["Absent Parent", "Parentification", "Economic Hardship"],
  },
  {
    slug: "new-muslims",
    title: "New Muslims",
    description: "Conversion, identity reconstruction, family friction, and finding community.",
    tags: ["Returning to Faith", "Religious Loneliness", "Identity Crisis"],
  },
  {
    slug: "recovering-from-burnout",
    title: "Recovering from Burnout",
    description: "When collapse becomes the first honest rest you’ve had in years.",
    tags: ["Burnout", "Brain Fog", "Perfectionism"],
  },
];

export const voiceStories: StorySeed[] = [
  {
    id: "1",
    title: "I Forgot What Safety Felt Like",
    excerpt:
      "Home taught me to listen for footsteps. Years later I still flinch at a raised voice. Naming it — emotional abuse, hypervigilance — was the first time I stopped calling myself “too sensitive.”",
    author: "Anonymous",
    date: "3 days ago",
    tags: ["Abuse", "Anxiety", "Burnout"],
  },
  {
    id: "2",
    title: "I Promised My Mother I Would End the Struggle",
    excerpt:
      "I became the adult in the room before I finished school. Ambition looked like drive from the outside. Inside it was a child’s promise: she will not carry this forever.",
    author: "Anonymous Brother",
    date: "1 week ago",
    tags: ["Parentification", "Economic Hardship", "Burnout"],
  },
  {
    id: "3",
    title: "The Sharp Mind I Still Remember",
    excerpt:
      "I used to hold whole arguments in my head. Now words slip. I grieve a version of myself that felt effortless — and I’m learning that fog is not failure.",
    author: "A.K.",
    date: "2 weeks ago",
    tags: ["Brain Fog", "Burnout", "Depression"],
  },
  {
    id: "4",
    title: "Coming Home to Faith Was Not Easy",
    excerpt:
      "I found Allah and lost the old map of who I was. Family didn’t understand. I prayed alone for a long time — and still do, sometimes — but the loneliness has a name now.",
    author: "Anonymous Sister",
    date: "3 weeks ago",
    tags: ["Returning to Faith", "Religious Loneliness", "Identity Crisis"],
  },
];

export const safetyPrinciples = [
  {
    title: "Content warnings",
    body: "Stories with graphic detail carry a clear warning before you open them. Sensitive categories are marked in the atlas.",
  },
  {
    title: "I need help now",
    body: "Every Voices surface includes a path to crisis lines. This site is a sanctuary for witnessing — not a substitute for emergency care.",
  },
  {
    title: "Witness, don’t advise",
    body: "No open comment threads for unsolicited advice. You can say “I hear you” or sit with a story in silence.",
  },
  {
    title: "No trauma comparison",
    body: "Moderation protects against ranking pain or invalidating someone else’s experience. Your story does not need to compete.",
  },
];

export function getAllExperiences() {
  return traumaDomains.flatMap((d) =>
    d.experiences.map((e) => ({ ...e, domain: d.slug, domainName: d.name })),
  );
}

export function getExperienceBySlug(slug: string) {
  return getAllExperiences().find((e) => e.slug === slug);
}

export function getStoriesByTag(tag: string) {
  return voiceStories.filter((s) => s.tags.includes(tag));
}

export function getUniqueStoryTags() {
  return [...new Set(voiceStories.flatMap((s) => s.tags))].sort();
}
