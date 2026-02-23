---
name: deploy-checking
description: Verifies site health after Vercel deploys. Triggers on "проверь деплой", "сайт работает?", "check deploy", after git push, or on "404", "сломалось", "не открывается". Automatically runs after any push to Vercel-connected repo.
---

# Deploy Checker

## Why
Broken deploys waste hours. This skill catches issues immediately after deploy — before users see them.

## Process
1. Detect site URL from vercel.json or .vercel/project.json
2. If Vercel MCP available — check deployment status and build logs first
3. Verify key pages return 200:
   - / (homepage)
   - /battles (AI Wars)
   - /explore (Timeline)
   - /leaderboard
   - /memes
   - /predictions
   - /victims
   - /model/[any-slug] (dynamic route — pick one known model)
   - /_not-found (should render BSOD 404, not default Next.js)
4. Check build output: how many static pages generated (expect 55)
5. Report results in table format:
   | Page | Status | Notes |
6. If any failures — suggest fix based on error type

## What to check
- All routes return 200 (not 404, 500, or redirect loops)
- Static page count matches expected (currently 55)
- Build completed without errors
- No TypeScript or ESLint errors in build log
- Dynamic routes resolved (model/[slug] pages)

## After check
- If all green: "Deploy healthy. [count] pages live."
- If issues found: list them with severity (critical/warning/info)
- Suggest specific fix for each issue
