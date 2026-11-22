---
name: mobile-native
description: Make mobile web interactions behave well on touch devices. Use for mobile web behavior such as sticky hover, safe areas, input zoom and viewport chrome.
---

# Mobile Native

This is for mobile web, not a React Native implementation guide. Reproduce
the issue on the relevant mobile browser. Gate hover by capability, retain
distinct press and focus feedback, and keep pinch zoom available. Choose
dynamic or stable viewport units for the actual layout, respect safe-area
insets, avoid small inputs that trigger unexpected zoom, and keep normal
scrolling available. Use the smallest fix that fits the UI. Read the
[mobile web reference](references/mobile-web.md) for symptom-specific fixes;
use [gestures](../gestures/SKILL.md) only where direct manipulation needs work.

Run [break UI](../break-ui/SKILL.md) after edits, including relevant touch
input, viewport changes, and normal browser navigation. State what was
checked on a real device, emulated, or blocked.
