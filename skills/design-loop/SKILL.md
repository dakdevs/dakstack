---
name: design-loop
description: Designs UI in Paper before building it - studies references, makes several prototypes, shows screenshots, applies the user's terse feedback, consolidates final screens, then builds to match after approval. Use when the user asks to design, redesign, or prototype a page or screen, mentions Paper, shares reference sites or screenshots, or says "make it Apple quality".
---

# Design Loop

Design first, build second. Building starts only after the user approves the
design.

## Steps

1. **Study the references.** Open every URL or screenshot the user gave.
   Break down what makes it work: layout, type scale, spacing, color, motion.
   For "Apple quality", look at how Apple's own pages handle the same thing.
2. **Prototype in Paper.** Make three distinct directions on separate pages
   unless the user asked for one. Use the product's real copy, real logos (as
   SVG), and real data. Never invent copy, testimonials, numbers, or
   "illustrative" images.
3. **Show screenshots** of each prototype at desktop and mobile sizes (see
   `show-me`). Before showing, review it yourself against `principle-taste`, and fix what fails.
   Check hover, focus, and pressed states, and that motion is short (under
   300ms for UI), eased, and interruptible.
4. **Apply feedback literally.** The user gives short notes ("less borders",
   "50% of that", "the blue on top is wasted space"). A percentage scales the
   current effect by that amount. Change what the note names and nothing
   else. Keep the previous version so you can step back.
5. **Get a second opinion** when the user says it looks bad or asks for
   review: have an Opus delegate critique the screenshots, apply the real
   points, and show again.
6. **Consolidate.** Put the final version of every screen on one "Final"
   page and move discarded work to an "Archive" page.
7. **Build** only after approval. Match the design 1:1, using the repo's
   components (shadcn, or StyleX where the repo uses it). Gate risky changes
   behind a feature flag when the repo has flags. Then `show-me` the built
   version next to the design.

If Paper is not available, prototype as static pages in the repo on a scratch
route, and say so.

## Standing rules

Read `principle-taste` for the full list. The ones most often missed in design:

- No borders for structure. Separate areas with background contrast and good
  rounded corners. Keep dividers short and subtle.
- Flat, no hard shadows.
- Body text 16px minimum, and type sizes consistent across screens.
- No modals for ordinary tasks. A page does one thing well. Confirming a
  destructive or privileged action is the exception.
- Do not hide actions in a "..." menu.
- Copy is informative and calm, not punchy. Run `unslop` on it.
