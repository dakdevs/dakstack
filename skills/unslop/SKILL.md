---
name: unslop
description: Edits prose to remove the patterns that make writing read as AI-generated, while keeping its meaning, evidence, and required formats intact. Use when writing or editing any prose for the user, including docs, READMEs, PR descriptions, commit messages, UI copy, and messages, or when the user says "unslop", "make this sound human", or "this reads like AI".
---

# Unslop

Apply this to every piece of prose you write or edit for the user. The goal is
writing that is informative and calm. It tells the reader what they need in
plain words, without selling.

## Copy preferences

- Inform; do not pitch. No hype, no punchy taglines, no salesy calls to action.
- Keep the tone even. Let facts carry the weight instead of adjectives.
- Never invent copy, claims, features, quotes, or numbers. If a sentence needs
  a fact you do not have, ask or leave a clear placeholder.
- Keep the author's meaning and level of certainty. Do not harden a hedge the
  evidence needs, and do not soften a finding the evidence supports.

## What not to touch

Edit authored prose only. Leave these exactly as they are: quotations, code,
commands, file paths, identifiers, log output, punctuation that a machine
parses, and any template or format the repo or user requires.

## Process

1. Read the text and mark every pattern from
   [references/patterns.md](references/patterns.md).
2. Rewrite those parts. Keep the meaning and the intended register.
3. Make it sound written by a person (below).
4. Reread and ask what still gives it away as AI-written. Fix that, then stop.

## Sounding like a person

Stripping patterns is only half the job. Flat, voiceless text is its own tell.

- Take a position when the evidence supports one, instead of listing both sides
  evenly by reflex.
- Vary sentence length. A short sentence lands. A longer one can carry a
  qualification or an example without strain.
- Say when something is mixed: "fast, but it uses twice the memory" says more
  than "fast".
- Use "I" or "we" where it is natural.
- Do not force symmetry. Real structure is a little uneven.
- Be concrete. "The job fails every night at 3am" beats "this is concerning".

## The worst offenders

The full catalog is in [references/patterns.md](references/patterns.md). These
come up most:

- No em dashes. Use a period or a comma. Parentheses and en dashes used as
  substitutes are the same tell.
- No inflated significance ("pivotal", "testament to", "evolving landscape").
- No "It's not just X, it's Y" and no forced groups of three.
- No "serves as" or "stands as" where "is" works.
- No chatbot framing: "Great question", "I hope this helps", "Let me know if".
- Prefer the plain word: use, help, many, if.
- Say the concrete thing: a mechanism, a number, or an instruction.
- Sentence case headings, straight quotes, no decorative emoji.
