---
name: show-me
description: Produces visual proof of a change - real screenshots and screen recordings at desktop and mobile sizes - and delivers it where the user can see it (Dia, Taildrop to their phone, a Tailscale URL, or embedded in the PR). Use when the user says "show me", "give me a screenshot", "record a video", "taildrop it", "open it in dia", "serve it over tailscale", or asks to see the latest version.
---

# Show Me

The user often works from their phone. They judge work by looking at it, not
by reading a summary. Show the real thing.

## Capture

- For PR work, follow `pr-proof`: capture both the pinned before revision
  and current after revision with matching state, data, and viewport. Record
  revisions in the capture notes and in the collapsed PR context. Any subsequent change requires refreshed
  after proof; never resend an old capture as the current result.
- Run the real app or page. Never show mocked data, a demo route, or a
  fragment when the user asked for the whole thing.
- Capture desktop (1440 wide) and mobile (390 wide) unless the user named a
  size. Include dark mode when the app has it.
- For flows and motion, record video, not a stack of stills. Use 60fps when
  the work is about animation or film.
- Look at every capture before sending it. Text cut off, overlapping, blank
  fields, or layout shift mean the work is not done. Fix it first.
- Do not interrupt the user or another running thread to capture. Use a
  separate browser profile or a headless run, and never take over the
  foreground app.

## Deliver

Use the route the user asked for. If they did not ask, pick the first that
fits:

1. **In the PR:** Follow the [PR body format](../pr-this/references/body.md).
   Upload the artifacts using the workspace instructions and verify that
   screenshots and videos render inline.
2. **To the phone:** `tailscale file cp <file> kirphone:`.
3. **Live:** `tailscale serve` the dev server in a tmux session, and give the
   `https://<host>.<tailnet>.ts.net` URL.
4. **On this Mac:** open the URL in Dia (`open -a Dia <url>`), or reveal the
   file in Finder (`open -R <file>`).

## Report

Embed the images or link the files with absolute paths. Under each, add one
line on what it shows and what to look for. If something still looks off, say
what, instead of calling it done.
