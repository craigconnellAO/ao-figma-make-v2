# Design Best Practices for Mobile Card UI Variations

Synthesized from the Impeccable design skill reference library. Focused on generating creative, high-quality UI variations for a Trust Bridge mobile card component (progress, completion, next steps).

---

## Core Design Principles (Top 10 Rules)

1. **One primary focus per screen** — Every card state has ONE dominant element (progress indicator, completion celebration, or next-step CTA). Everything else is secondary or tertiary.

2. **Vary spacing for rhythm** — Same padding everywhere is monotony. Use tight grouping for related elements (8–12px) and generous separation between sections (48–96px).

3. **Avoid the identical card grid** — Never repeat icon + heading + text uniformly. Break monotony with varied sizes, asymmetric layouts, and mixed content types.

4. **Every word earns its place** — No restated headings, no intros that repeat the title. Say it once, say it well.

5. **Progressive disclosure** — Show what's needed now, hide the rest. Reveal complexity only when the user needs it.

6. **Match delight to emotional moment** — Celebrate success states, be reassuring during progress, be clear and helpful for next steps. Never playful during errors.

7. **≤4 items in working memory** — At any decision point, users can hold only 4 things. Limit visible choices, group information, chunk content.

8. **No AI slop** — If someone could say "AI made this" without doubt, it's failed. Avoid generic gradients, glassmorphism, hero-metric templates, and side-stripe borders.

9. **Hierarchy through scale + weight contrast** — Use ≥1.25 ratio between type steps. Avoid flat scales where sizes are too close together.

10. **Space is a design material** — Use whitespace deliberately to guide the eye, create grouping, and communicate importance. Don't wrap everything in containers.

---

## Typography Guidelines

- **Body line length**: Cap at 65–75ch using `max-width: 65ch`
- **Hierarchy**: Use a 5-size system (xs/sm/base/lg/xl) with a committed ratio (1.25–1.5×)
- **Minimum body text**: 16px (never smaller on mobile)
- **Line-height**: Use as the base unit for all vertical spacing. Scales inversely with line length.
- **Dark backgrounds**: Bump line-height +0.05–0.1, add letter-spacing 0.01–0.02em, optionally step weight up one notch
- **ALL-CAPS labels**: Add 0.05–0.12em letter-spacing
- **Tabular numbers**: Use `font-variant-numeric: tabular-nums` for progress percentages and data
- **Headings**: Apply `text-wrap: balance` for even line breaks
- **Font pairing**: One font family with weight variation is often cleaner than two competing typefaces. Only add a second for genuine contrast.
- **Fluid type for headings only**: Use `clamp()` for display text on marketing pages; use fixed rem scales for product UI

---

## Layout & Spacing Rules

- **Use a spacing scale** — Values from a defined set, never arbitrary numbers. Use `gap` for sibling spacing.
- **Tight grouping** for related elements (8–12px between siblings)
- **Generous separation** between sections (48–96px)
- **Flexbox for 1D** (card contents, button groups); **Grid for 2D** (page-level structure, dashboards)
- **Never nest cards inside cards** — Use spacing and dividers for hierarchy within
- **Touch targets**: 44×44px minimum on mobile
- **Density as a variable**: Drive all spacing through a density multiplier for variation (`calc(var(--density) * base)`)
- **Asymmetric layouts feel more designed** than centered-everything patterns
- **Squint test**: Blur your eyes — can you identify primary, secondary, and groupings?
- **No horizontal scroll** on mobile — content must fit viewport

---

## Content & UX Writing Best Practices

- **Button labels**: Specific verb + object ("Continue journey", "View next step") — never "OK", "Submit", or "Click here"
- **Error messages formula**: What happened → Why → How to fix
- **Empty states**: Acknowledge → Explain value → Provide clear action
- **Loading states**: Be specific ("Calculating progress…") and set expectations for duration
- **Consistency**: Pick one term and stick with it throughout (don't alternate "step/stage/phase")
- **No blame**: "Please enter…" not "You entered invalid…"
- **Success messages**: Confirm what happened + what happens next ("Step complete! You're 3 of 5 steps through.")
- **Tone adapts to moment**: Celebratory for success, reassuring for loading, serious for destructive confirms
- **Conciseness**: Cut every sentence in half, then do it again. If the heading explains it, the body is redundant.
- **Active voice always**: "We saved your progress" not "Your progress has been saved"

---

## Cognitive Load Reduction Techniques

- **Chunk information**: ≤4 items per visible group at any decision point
- **Single focus**: One primary task per screen state without distraction
- **No memory bridges**: Don't require users to remember info from a previous screen — keep relevant context visible
- **Visual hierarchy**: Make it immediately clear what's most important (one primary element, 2–3 secondary, everything else muted)
- **Progressive disclosure**: Hide advanced options, show only what's needed now
- **Reduce choices**: 1 primary action button, 1–2 secondary max. Group the rest.
- **Consistent patterns**: Same type of action = same type of UI everywhere
- **Show current location**: Always communicate where the user is in the journey (progress indicators, active states)
- **Sequence decisions**: Let the user do one thing at a time — don't demand parallel processing

---

## Delight & Polish Patterns

### Success/Completion States
- Checkmark draw animation for completion
- Confetti burst for major milestones (keep < 1 second)
- Gentle scale + fade for step confirmation
- Personalized messages ("You completed step 3 of 5!")
- Progress bars that celebrate at 100%

### Progress States
- Skeleton screens over spinners (preview content shape)
- Encouraging, product-specific loading messages
- Progress indication with milestones marked
- Smooth transitions between progress steps

### Micro-interactions
- Satisfying button press (translateY + shadow change on :active)
- Subtle lift on hover (translateY(-2px) with ease-out-quart)
- Input fields that animate on focus
- Smooth state transitions (150–300ms, ease-out-quart/quint/expo)

### Polish Checklist
- All interactive states designed (default, hover, focus, active, disabled, loading, error, success)
- Consistent spacing from token scale
- Typography hierarchy consistent across all card states
- All transitions smooth (never bounce/elastic — use exponential ease-out)
- Respects `prefers-reduced-motion`
- Icons from same family, optically aligned
- No layout shift on state changes
- Touch targets ≥ 44px
- Contrast meets WCAG AA

### What to Avoid
- Never delay core functionality for delight
- No sound without user opt-in
- No glassmorphism as default decoration
- No gradient text (`background-clip: text`)
- No side-stripe borders (colored `border-left/right` > 1px)
- No bounce/elastic easing — feels dated
- No generic loading messages ("Herding pixels…" is AI slop)

---

## Critique Checklist (for Evaluating Variations)

### Visual Quality
- [ ] Passes the AI slop test — would NOT immediately read as AI-generated
- [ ] Clear visual hierarchy (squint test passes)
- [ ] Spacing uses defined scale with rhythm (not uniform)
- [ ] Typography has clear hierarchy with sufficient contrast between levels
- [ ] Color is purposeful, not decorative
- [ ] No absolute bans violated (no side-stripes, gradient text, glassmorphism-as-default, hero-metric template, identical card grids)

### Usability
- [ ] Primary action is immediately obvious
- [ ] ≤4 items competing for attention at any point
- [ ] Progress/location in journey is always clear
- [ ] Copy is specific, concise, and action-oriented
- [ ] Touch targets ≥ 44px on mobile
- [ ] All states covered (progress, complete, next-steps, error, empty)

### Interaction Quality
- [ ] All 8 interactive states designed per element
- [ ] Transitions are smooth (150–300ms, exponential ease-out)
- [ ] Focus indicators visible and high-contrast
- [ ] Keyboard navigation works logically
- [ ] Reduced motion respected

### Emotional Design
- [ ] Delight matches the emotional moment (celebration at completion, encouragement during progress)
- [ ] Peak-end rule satisfied (most intense moment is positive, experience ends well)
- [ ] Tone appropriate for context and audience
- [ ] Personality present but not blocking usability

### Nielsen's Heuristics Quick-Check
- [ ] **System status visible** — User knows where they are in the journey
- [ ] **Real-world match** — Language and metaphors are familiar
- [ ] **User control** — Can go back, skip, or exit
- [ ] **Consistency** — Same patterns throughout all card states
- [ ] **Error prevention** — Hard to make mistakes
- [ ] **Recognition > recall** — Options visible, not memorized
- [ ] **Aesthetic minimalism** — Every element earns its space
- [ ] **Error recovery** — Clear messages with actionable fixes

### Severity Ratings for Issues
| Priority | Description | Action |
|----------|-------------|--------|
| P0 | Prevents task completion | Fix immediately |
| P1 | Causes significant confusion | Fix before release |
| P2 | Annoyance with workaround | Fix in next pass |
| P3 | Nice-to-fix, no real impact | Fix if time permits |
