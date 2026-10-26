---
name: film
description: Makes a product film, launch video, logo animation, or showreel to an Apple-level bar - researches references, plans shots, generates assets through Executor (Seedance, Veo, Suno, ElevenLabs), edits with ffmpeg or Blender, critiques with reviewer delegates, and delivers each full cut to the user's phone. Use when the user asks for a commercial, launch video, product film, intro animation, or showreel.
---

# Film

The user judges the whole cut, never fragments. Every version they see is a
complete, watchable film.

## Plan

1. **References.** Find two or three real references the user would respect
   (Apple, YC launch videos, or what they named). Download them with `yt-dlp`
   for private study only and note what makes each work: pacing, cuts, type,
   sound.
2. **Shot list.** Write the beats with durations, what is on screen, and the
   audio for each. Use the real app UI, captured with `show-me`, for every
   product shot. Never invent UI.
3. **Budget.** Generation costs money. State the expected spend per tool and
   get approval through Executor before the first paid call. Stay under any
   cap the user set.

## Make

- Generate footage, music, and voice through Executor connectors (Seedance or
  Veo, Suno, ElevenLabs). Keep every generation and every cut; do not delete
  iterations.
- Edit with ffmpeg, or Blender for 3D and compositing. Export 60fps, with the
  app composited exactly inside the device frame: no edges, glare
  mismatches, or duplicate UI underneath.
- Keep type, timing, and tone calm and premium. No punchy AI-style copy.

## Critique loop

After each full cut, have two reviewer delegates on different models (for
example Opus 5.5 and Grok 4.7) watch the frames and audio and grade the cut
against the references: what looks cheap, rushed, janky, or misaligned. Fix
the real points and cut again. Stop when both reviewers would ship it, or
after the user's feedback says it is right.

## Deliver

Send each full cut to the user's phone (`tailscale file cp <file> kirphone:`)
and give the absolute path. Say which version it is and what changed since
the last one. Apply the user's one-line notes literally on the next cut.
