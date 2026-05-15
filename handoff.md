# Handing off Figma Make output to a developer

> One of the reasons v2 exists: with v1, designers couldn't confidently take Make output into a conversation with engineering. The output looked AO-shaped but didn't map cleanly to real `@ao/components`, real tokens, or real Strata classes. This guide closes that gap.

If you've used the kit as intended, your Make output is **already dev-ready** — it uses real Strata class names, real token names, real `data-aods` selectors, and approved component variants. This file gives you the language to make that visible to your dev partner.

---

## What an AO developer will look for

When a dev opens your prototype HTML, they're scanning for three things. The kit makes all three explicit so you don't have to explain.

| What they look for | What the kit gives you |
|---|---|
| **"Is this using `@ao/components`?"** | Every component blueprint maps 1:1 to a real `@ao/components` export — `Button`, `Field`, `Input`, `Card`, `Tag`, `Notice` (`InputMessage` in code), `Tabs`, `Accordion`, `Breadcrumb`, `LoadingSpinner`. |
| **"Are the variants real, or invented?"** | The kit only uses approved variants. `btn-primary`, `tag-success`, `card-raised` all exist verbatim in Strata. There is no `btn-success` or `tag-purple`. |
| **"Where's the test selector?"** | Every component root has `data-aods="component-name"` matching the production attribute used by AO's E2E tests. |

---

## Translation table — HTML class → `@ao/components` import

Use this when discussing a prototype with a developer. The left column is what they see in the HTML; the right column is what they'll write in React.

| HTML in the prototype | `@ao/components` equivalent |
|---|---|
| `<button class="btn btn-primary">` | `<Button variant="primary">` |
| `<button class="btn btn-secondary btn-lg btn-full">` | `<Button variant="secondary" lg fullWidth>` |
| `<button class="btn btn-tertiary btn-icon" aria-label="…">` | `<Button variant="tertiary" icon aria-label="…">` |
| `<div class="field">` + label + input + message | `<Field>{({ labelProps, inputProps, messageProps }) => …}</Field>` |
| `<input class="field-input is-error">` | `<Input state="error" />` |
| `<input class="field-input is-success">` | `<Input state="success" />` |
| `<div class="field-select-wrap"><select class="field-input">` | `<Select>` |
| `<textarea class="field-input">` | `<Textarea>` |
| `<label class="toggle-item"><input type="checkbox">…` | `<Checkbox>` inside `<CheckboxGroup>` |
| `<label class="toggle-item"><input type="radio">…` | `<RadioButton>` inside `<RadioButtonGroup>` |
| `<div class="card">` | `<Card>` |
| `<div class="card card-raised">` | `<Card raised>` |
| `<div class="card card-error">` | `<Card state="error">` |
| `<span class="tag tag-success">` | `<Tag color="success" />` |
| `<div class="notice notice-warning">` | `<InputMessage state="attention" />` (notices are surface-level `InputMessage` in the library) |
| `<nav><ol class="crumb">…` | `<Breadcrumb><BreadcrumbItem>…</Breadcrumb>` |
| `<div class="tab-list" role="tablist">` + tabs | `<Tabs><TabHeader><Tab>…</TabHeader><TabContent><TabPanel>…</TabContent></Tabs>` |
| `<div class="accordion">` + items | `<Accordion><AccordionItem><AccordionHeader>…<AccordionContent>…` |
| `<div class="spinner">` | `<LoadingSpinner />` |
| `<div role="dialog" aria-modal="true">` | `<Modal isOpen onClose={…} title={…}>` |

---

## Tokens — what to point at when the dev asks "where do these colours come from?"

All of the colours in your prototype reference tokens defined in:

- **`@ao-internal/design-tokens/defs/ao/web/tokens.json`** — the production token source
- **[`kit/tokens.json`](./kit/tokens.json)** in this kit — the DTCG mirror, useful for variable wiring or quick eyeballing

When a dev asks "is this `action-primary-base` (#00893e) or `brand-primary-base` (#12c35a)?" — point them at the prototype's `:root` block, then to the matching token in `kit/tokens.json`. The names match.

---

## A useful 30-second handoff script

Adapt this when pasting a Make prototype into Slack or Linear:

> *"Mock built in Figma Make using the AO Design System kit v2. All components use real Strata class names (`btn-primary`, `field-input is-error`, etc.) and the `data-aods` attribute is on every component root. Variants are approved — no inventions. Tokens are referenced via CSS variables matching `@ao-internal/design-tokens`. Translation map and token reference: [link to kit/handoff.md]. Happy to walk through any specific component."*

This tells engineering, in three sentences, that you've done the work they need you to do.

---

## When the prototype doesn't translate cleanly

If a dev points at something in your output that doesn't map to `@ao/components`:

1. **First, check whether it's an anti-pattern slip.** Read [`kit/anti-patterns.md`](./kit/anti-patterns.md). If the output broke a rule, re-prompt Make with the rule quoted back.
2. **If it's a genuinely missing component**, that's a design-system conversation, not a Make problem. Take it to the design systems team — don't ask engineering to build a one-off.
3. **If it's a layout that doesn't fit a pattern**, that's fine — patterns are starting points, not constraints. Your novel layout is OK *as long as* the components, tokens, and behaviour inside it are AO-system.

---

## What this enables

With this handoff path, designers can:

- Ship Make prototypes as the visual reference for a Linear ticket — no separate "and here are the tokens" explainer needed.
- Hand a Make HTML file directly to engineering as a starting point — they can scaffold the `@ao/components` version by reading the classes.
- Have a productive conversation about *behaviour* (state transitions, error timing, focus order) instead of re-litigating colours and component choice on every review.

That conversation — about behaviour and intent, not about which green is the right green — is the one v2 is designed to enable.
