---
name: agent-orchestrator
description: Use ALWAYS at start of any new task. Auto-detects stack, selects skills, coordinates workflows. Triggers on "начинай", "погнали", "new task", "new feature".
---

# Agent Orchestrator v3

## Protocol
1. Read package.json → detect stack (NEVER hardcode versions)
2. Scan .agent/skills/ and .claude/skills/ → what's available
3. Match task to skills
4. If missing capability → create skill or suggest install
5. Execute: Research → Plan → Build → Verify
6. After session → suggest updates to CLAUDE.md or skills

## Workflow Patterns

### New Feature
Research existing code → Plan changes → Build → pnpm build (0 errors) → git commit

### Bug Fix
Read error → Find root cause → Fix → Verify → Commit

### Content Update
Read content pack → Find data files → Update → Verify UI → Commit

### 3D Component
Read threejs-skills → Build R3F component → CSS fallback → Mobile check → Integrate

## Rules
- ONE question max if genuinely needed
- Do not explain — execute
- Complete entire task chains
- /compact when context grows

## MCP Strategy
Context7 always enabled (library docs).
Add others ONLY when needed:
- Vercel MCP: only for deploy tasks
- Playwright: only for visual testing
- GitHub MCP: only for PR operations

Keep under 3 MCP servers active = saves ~15K tokens.
