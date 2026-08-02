## Velorah — a cinematic site for reclaiming your mind

A single, coherent site built on the hero's visual language (deep navy, Instrument Serif, liquid glass, fullscreen video) applied to the full "clarity blueprint" content. Calm, artistic, editorial — no dashboards, no clutter.

### Design system (set once, used everywhere)

- Fonts loaded via `<link>` in `src/routes/__root.tsx`: Instrument Serif + Inter 400/500. CSS vars `--font-display`, `--font-body`.
- Dark navy theme in `src/styles.css` using the exact HSL values given (background `201 100% 13%`, foreground white, muted-foreground `240 4% 66%`, etc.), mapped into the existing `@theme inline` tokens.
- `.liquid-glass` class and the `fade-rise` keyframes / delay classes exactly as specified.
- Shared primitives: glass nav, glass footer, section heading (serif, tight tracking, `<em className="not-italic text-muted-foreground">` for the softened phrase), prose styles for long-form reading (generous line-height, max-w-2xl, large comfortable text).
- Rule applied site-wide: no blobs, no radial gradients, no overlays. Depth comes from the video and typography only.

### Pages

```text
/                 Home — hero (exact spec) + six pillar cards + closing invitation
/studio           The Six Pillars — the framework overview, each pillar linking to its guide
/pillars/:slug    Guide pages (6): understand, body, mind, rhythm, connection, tools
/journal          Article index — editorial list, serif titles, quiet metadata
/journal/:slug    Long-form article layout (first piece: "Why Can't I Do Math in My Head Anymore?")
/about            The mission, the voice, the promise (no data selling, no gatekeeping)
/reach-us         A quiet contact page
```

Nav links in the hero (Home, Studio, About, Journal, Reach Us) all resolve to real routes.

### Content mapped from the blueprint

- **Understand** — brain fog, memory, attention collapse, burnout & trauma, ADHD vs acquired symptoms. Each written as _What it feels like → Why it happens → First steps_.
- **Body** — sleep (glymphatic clearing, protocols), nutrition, exercise & BDNF.
- **Mind** — reading, chess, mental math & memory training, plus a clearly-labelled Faith & Meaning subsection (prayer, dhikr, Quran) alongside universal practices (meditation, gratitude, nature) so it invites rather than imposes.
- **Rhythm** — minimum viable routine, environment design, identity-based habits.
- **Connection** — self-compassion, learning to feel again, communication, community.
- **Tools** — assessment overviews (PHQ-9, GAD-7, ASRS, burnout, sleep) presented as educational with explicit "see a professional" guidance, habit tracker and fog-journal templates, a working focus timer.
- A persistent, calmly worded care note: this is education, not medical advice.

### Interaction & accessibility

- Video only on the home hero; every other page opens on the still navy field so the site stays a place of rest.
- Respect `prefers-reduced-motion`: fade-rise animations and video playback disabled.
- Long-form pages get a reading-comfort toggle (normal / large text).
- Semantic HTML, single H1 per page, real alt text, per-route `head()` with unique title, description, og/twitter tags.

### Technical notes

- TanStack Start file routes under `src/routes/`; the placeholder `src/routes/index.tsx` is rewritten as the hero home page.
- Article and pillar content lives in typed TypeScript content modules (`src/content/*`), rendered by two layout components — so adding a new article is one object, not a new page.
- shadcn/ui primitives used where they help (button, accordion for the "why it happens" cascades, tabs on Tools), restyled to the glass language; no default shadcn look left visible.
- Static content, no backend needed. If you later want the community forum, saved journals, or the AI mentor, that's a second phase with Lovable Cloud.

### Build order

1. Theme, fonts, liquid glass, animations, shared nav/footer.
2. Home hero exactly to spec + pillar cards.
3. Pillar guide layout + all six guides.
4. Journal index + article layout + the mental-math piece.
5. About, Reach Us, Tools (focus timer, templates).
6. Per-route metadata pass and a reduced-motion/accessibility pass.
