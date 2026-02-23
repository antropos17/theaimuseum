---
name: git-automating
description: Automates all git and GitHub operations. Triggers on "закоммить", "коммит", "push", "запуши", "PR", "pull request", "changelog", "почисти ветки", or after any successful code changes that should be saved. Your job is making git invisible.
---

# Git Automator

## Why
Developers lose work from uncommitted changes, messy history, wrong branches. This skill handles all git so the user never thinks about commands.

## Before any action
- Read .git/config for remote URL and current branch
- Detect OS: Windows PowerShell uses ";" not "&&"
- Run git status --porcelain to see what changed

## Smart Commit
1. Analyze changed files
2. Categorize by dominant change type:
   - feat: new feature or component
   - fix: bug fix
   - style: CSS/UI only changes
   - chore: config, deps, tooling
   - docs: documentation
   - refactor: code restructure without behavior change
3. Generate message: "type: concise description"
   - English, lowercase, no period, max 72 chars
4. Run: git add -A; git commit -m "message"
5. Offer to push (default: yes)

### Commit examples
- Modified hero.tsx (added parallax) + globals.css (new keyframe) → `feat: add parallax scroll to hero section`
- Fixed z-index on mobile overlay → `fix: resolve CRT overlay z-index on mobile`
- Updated package deps → `chore: update dependencies`

## PR Creation
1. Detect current branch vs main
2. Collect commits: git log main..HEAD --oneline
3. Generate PR title from branch name + commits
4. Generate body: summary, changes list, testing notes
5. Push branch if not pushed
6. Output: gh pr create command or GitHub URL

## Branch Cleanup
1. List all: git branch -a
2. Flag: merged branches, stale (>30 days no commits)
3. Show recommendations to user
4. On approval: delete local + remote stale branches
5. NEVER delete: main, develop, current branch

## Safety Rules
- NEVER force push to main
- NEVER delete main or current branch
- Always show git diff summary before committing
- If something looks wrong — warn, don't proceed
- Windows PowerShell: ";" not "&&"
