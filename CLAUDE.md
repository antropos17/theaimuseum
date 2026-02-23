# AI Museum

## Project
Site: v0-theaimuseum.vercel.app
Repo: github.com/antropos17/theaimuseum
Vercel Team: team_HjsLixEYtiBw7bRX4NQyJ8hl
Vercel Project: prj_SKzsDfTGZPVMkWPaFo9LFaqFfHBN

## Stack
Read package.json for exact versions. NEVER hardcode.
pnpm ONLY. Windows: ";" not "&&".

## Design
Neo-8-Bit CRT. BG #0a0a0f, accent #00ff88, font JetBrains Mono.
Dark theme ONLY. Glow, scanlines, retro terminal vibes.

## Rules
- Trust code over docs. Read before changing.
- Do not explain — execute.
- Complete entire task chains.
- TypeScript strict. No `any`. Named exports.
- Server Components default. `use client` only when needed.
- Dynamic imports for Three.js, GSAP, Framer Motion.
- Max 300 lines per file. Early returns.
- Commit after every working state.
- NEVER force push main.
- /compact when context grows large.

## 3D
R3F: always `use client` + dynamic import. CSS fallback. 60fps. Dispose on unmount. Mobile: simplified.
