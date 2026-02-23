---
name: agent-orchestrator
description: Use at the START of every new task. Detects stack, selects skills, plans execution. Triggers on "начинай", "new task", "new feature", or any task that needs planning before coding.
---

# Agent Orchestrator

## Protocol (every task)
1. Read package.json → confirm stack (never assume versions)
2. Scan .claude/skills/ → what knowledge is available
3. Read relevant files before changing anything (trust code over docs)
4. Plan: which files change, in what order
5. Execute: implement, build, verify, commit
6. If task A reveals issue B → fix both before done

## When to just execute (skip planning)
- Git operations, single file edits, known commands, config updates

## When to ask (max 1 question)
- Ambiguous requirements, multiple valid architectures, security concerns

## After every session
Suggest updates to CLAUDE.md or skills if something important was learned.
