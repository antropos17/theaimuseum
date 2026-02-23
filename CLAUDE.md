# AI Museum

## What
Interactive AI history museum. Site: v0-theaimuseum.vercel.app
Repo: github.com/antropos17/theaimuseum

## Stack
Read package.json for exact versions. NEVER hardcode here.

## How
- pnpm only. Windows PowerShell: use ";" not "&&"
- Server Components default. "use client" only when needed
- Dynamic imports for Three.js, GSAP, heavy libs
- TypeScript strict. No `any`. Named exports
- Max 300 lines per file. Early returns
- Dark theme only. BG #0a0a0f, accent #00ff88, font JetBrains Mono
- R3F: always "use client" + dynamic import + CSS fallback

## Verify
- pnpm build must pass with 0 errors before commit
- Commit after every working state. Never force push main

## Pointers
- Design system: see globals.css and tailwind.config
- Data files: see lib/data/ for models, companies, memes
- 3D components: see components/ for R3F patterns
- Skills: see .claude/skills/ for domain knowledge
