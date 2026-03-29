# Fixes Log

Chronological record of the main problems found while building and stabilizing this app, plus the fixes applied in this repo.

## 1. Codex Home / Skills / Auth

- Problem: repo-local `CODEX_HOME` and global `CODEX_HOME` were mixed, which caused confusion about where skills were installed and why Codex auth stopped working.
- Cause: the repo-local `.codex` did not have the same login state as the global `~/.codex`.
- Fix:
  - installed `frontend-skill` globally
  - updated orchestrator prompts to explicitly name `frontend-skill` for frontend-oriented stages
  - clarified that repo-local `CODEX_HOME` overrides the global home entirely

## 2. Worktrees Disappearing

- Problem: `tmp/worktrees` looked empty after orchestrator runs.
- Cause: worker git worktrees were intentionally cleaned up after success and failure.
- Fix:
  - added `--keep-worktrees` to [orchestrator.py](/home/postnl/multi-agent-producer_V0/Project_3_education/orchestrator.py)
  - forwarded the same flag through [codex_supervisor.py](/home/postnl/multi-agent-producer_V0/Project_3_education/codex_supervisor.py)

## 3. App Would Not Start

- Problem: `next` was missing, `pixi.js` was missing, lockfiles conflicted, and `node_modules` was inconsistent.
- Cause: incomplete dependency state and unresolved project root issues in Next.
- Fix:
  - restored missing dependencies
  - added [next.config.mjs](/home/postnl/multi-agent-producer_V0/Project_3_education/next.config.mjs) with explicit root handling
  - switched local scripts to webpack mode in [package.json](/home/postnl/multi-agent-producer_V0/Project_3_education/package.json)

## 4. `better-sqlite3` Failed on Node 24

- Problem: `npm install` failed while building `better-sqlite3`.
- Cause: old `better-sqlite3 9.x` was incompatible with Node 24.
- Fix:
  - upgraded `better-sqlite3` in [package.json](/home/postnl/multi-agent-producer_V0/Project_3_education/package.json)

## 5. Repo Boundary Violation Risk

- Problem: npm config and environment issues risked leaking outside the repo.
- Cause: inherited global npm config and an accidental repo `.npmrc` creation during troubleshooting.
- Fix:
  - removed the repo `.npmrc`
  - kept subsequent changes inside `Project_3_education` only
  - avoided touching `.npmrc` again

## 6. Theme Violated The Brief

- Problem: the UI used dark colors even though the brief explicitly said no dark colors.
- Cause: generated styling drifted toward a dark premium theme.
- Fix:
  - rewrote [styles/theme.css](/home/postnl/multi-agent-producer_V0/Project_3_education/styles/theme.css) to use a bright pastel/light palette
  - removed the dark scene overlay

## 7. Scene Rendering Was Broken

- Problem: sprites, target, and background were not visible or were clipped.
- Cause: the previous scene path was not reliably rendering the assets or layout.
- Fix:
  - replaced the scene with a DOM-based renderer in [components/SceneCanvas.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/SceneCanvas.tsx)
  - rendered actual assets from `public/assets`
  - switched to percentage-based layout so the whole scene fits in frame

## 8. Workspace Was Unclear And Felt Dead

- Problem: the compose area looked empty, buttons felt inert, and the user did not know what to build.
- Cause: the interface relied too much on implicit drag-and-drop behavior.
- Fix:
  - made block chips clickable in [components/BlockWorkspace.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/BlockWorkspace.tsx)
  - added an explicit empty state under `On Start`
  - added starter recipes and puzzle coaching
  - expanded readability and workspace sizing in [styles/theme.css](/home/postnl/multi-agent-producer_V0/Project_3_education/styles/theme.css)

## 9. Puzzle Intent Was Hard To Understand

- Problem: players could not tell what the target was, what blocks to use, or how to recover from failure.
- Cause: puzzle briefings and controls were too generic.
- Fix:
  - added puzzle-specific guidance in [app/page.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/app/page.tsx)
  - added recommended blocks, ordered plans, and starter recipes
  - added visible failure hints in [components/ControlsPanel.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/ControlsPanel.tsx)

## 10. `Loop Lane Delivery` Was Visually Misleading

- Problem: too many target-like items appeared, and the puzzle felt unintuitive.
- Cause: collectibles and goal markers were not clearly distinguished.
- Fix:
  - labeled side items as `Treat`
  - labeled the finish tile as `Goal`
  - linearized treat positions in [lib/puzzles/definitions.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/lib/puzzles/definitions.ts)
  - updated hint text and puzzle coaching

## 11. Reset / Play State Bugs

- Problem: `Reset` did not fully reset, `Play` could loop or stack, and switching puzzles reused stale state.
- Cause: animation timers and scene state survived across runs.
- Fix:
  - forced fresh scene instances on play/reset/puzzle switch in [app/page.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/app/page.tsx)
  - cleared animation timers in [components/SceneCanvas.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/SceneCanvas.tsx)

## 12. `Running program...` Could Get Stuck

- Problem: some failed runs never left the running state.
- Cause: immediate-failure timelines could end without the scene completion callback firing.
- Fix:
  - made [components/SceneCanvas.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/SceneCanvas.tsx) complete even when the timeline has only the initial frame

## 13. Reveal After Repeated Failure

- Problem: after several failed attempts, there was no working recovery path.
- Cause: reveal logic did not exist, then later existed only for some puzzles.
- Fix:
  - added per-puzzle failed-attempt tracking
  - added `Reveal Working Program` after 5 failures in [components/ControlsPanel.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/ControlsPanel.tsx)
  - injected reveal programs into the workspace from [app/page.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/app/page.tsx)

## 14. `Conditional Crossing` Reveal Failed

- Problem: the revealed program for `Conditional Crossing` still failed.
- Cause:
  - the first revealed sequence did not match the engine behavior
  - the puzzle definition itself was effectively unsolvable
- Fix:
  - added the missing center path tile in [lib/puzzles/definitions.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/lib/puzzles/definitions.ts)
  - replaced the reveal program with one validated directly against the engine

## 15. Jump Animation And Jump Logic Did Not Match

- Problem: jump visually landed on the obstacle or looked like it was advancing and executing the next command at the same time.
- Cause:
  - engine jump movement originally stepped onto the obstacle tile
  - scene timing was too short after jump frames
- Fix:
  - rewrote jump movement in [lib/game/engine.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/lib/game/engine.ts) so Lumi lands on the tile after the obstacle
  - added high-jump and low-hop motion in [components/SceneCanvas.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/SceneCanvas.tsx)
  - lengthened jump frame duration and movement transition timing in [styles/theme.css](/home/postnl/multi-agent-producer_V0/Project_3_education/styles/theme.css)

## 16. Analytics Duration Was Wrong

- Problem: average duration showed `0 ms`.
- Cause: duration was based on synchronous engine execution time instead of visible run time.
- Fix:
  - measured actual elapsed time from `Play` to sequence completion in [app/page.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/app/page.tsx)

## 17. Analytics Were Not Persisted

- Problem: analytics were only in React state and not stored in SQLite.
- Cause: the app never posted run data to the existing events API.
- Fix:
  - wired run completion in [app/page.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/app/page.tsx) to POST attempts, events, movements, and code snapshots to [app/api/events/batch/route.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/app/api/events/batch/route.ts)
  - ensured puzzle catalog seeding before inserts

## 18. Analytics Dashboard Was Not Reading SQLite

- Problem: the dashboard still showed in-memory state instead of stored DB data.
- Cause: there were no analytics read routes.
- Fix:
  - added shared DB connection in [lib/db/connection.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/lib/db/connection.ts)
  - added analytics readers in [lib/db/analytics.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/lib/db/analytics.ts)
  - added:
    - [app/api/analytics/summary/route.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/app/api/analytics/summary/route.ts)
    - [app/api/analytics/puzzle/[puzzleId]/route.ts](/home/postnl/multi-agent-producer_V0/Project_3_education/app/api/analytics/puzzle/[puzzleId]/route.ts)
  - refreshed analytics from SQLite on page load and after persistence

## 19. Replay Dots Used Duplicate React Keys

- Problem: the console reported duplicate keys in the analytics replay path.
- Cause: replay dots were keyed only by `frame.step`, which was not unique enough for persisted movement data.
- Fix:
  - changed the replay dot keying in [components/AnalyticsDashboard.tsx](/home/postnl/multi-agent-producer_V0/Project_3_education/components/AnalyticsDashboard.tsx)

## 20. Remaining Known Issue

- The app consistently compiles through the main build step.
- A separate Next build-worker issue still remains:
  - `Next.js build worker exited with code: 1 and signal: null`
- This appears after the main compile and is still unresolved.
