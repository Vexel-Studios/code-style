# Vendored anti-slop

Opinionated Oxlint rules (generic plugin `anti-slop`, Effect plugin `anti-slop-effect`). This copy is ours: change rules and options to fit Pulse Onboard, and record every change below so a later upstream update can be merged on purpose.

- Source: https://github.com/dmmulroy/anti-slop
- Commit: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b` ("Merge pull request #36 from K-Mistele/contrib/effect-tag-match-rules")
- Copied: 2026-10-01, the whole `src/` directory (rules, `effect/`, `shared/`, `vendor/eslint-stylistic/` with its own `LICENSE` and `UPSTREAM.md`; that file's `pnpm check` and `pnpm sync:skill-assets` steps are upstream's own and do not apply here, use the commands below), including the `*.test.ts` RuleTester suites. They need only `oxlint` (for `oxlint/plugins-dev`) and Node's built-ins, so no extra dev dependency was added.
- License: MIT. The vendored ESLint Stylistic code keeps its MIT `LICENSE` in `vendor/eslint-stylistic/`.
- Oxlint and `@oxlint/plugins`: 1.90.0, exact, in the root `catalog` and root `devDependencies` (upstream pins 1.78.0).

## Configuration

`oxlint.config.ts` at the repository root registers both plugins and enables every rule at `error`, plus native `oxc/no-accumulating-spread`, for the v2 code only (`packages/{platform,ingestion,conversation-engine,knowledge,sync,benchmarks,criteria-coverage,synthetic-corpus}` and `apps/agents`). Native Oxlint categories are off; ESLint stays the main linter. Each v2 package's `lint` script runs ESLint, then `oxlint -c ../../oxlint.config.ts --deny-warnings .`.

## Local modifications

1. `rules/require-readable-spacing.ts`: consecutive top-level re-exports (`export * from`, `export { x } from`) may stay grouped, like imports, so a module of re-exports remains one block. Since the owner decision of 2026-10-07 (no barrels; ESLint's `pulse-onboard/no-re-exports`), the only such module in the v2 code is the agents Worker's entry (`apps/agents/src/index.ts`), which exports its Durable Object, Workflow and entrypoint classes for Wrangler. Upstream required a blank line between every top-level statement other than imports. Covered by a valid and an invalid case in `rules/require-readable-spacing.test.ts`.
2. `rules/require-readable-spacing-cli.test.ts`: runs `bun x oxlint` instead of `pnpm exec oxlint`.

No other rule, message or option differs from upstream.

## Spacing rule and the ESLint style

`require-readable-spacing` only inserts blank lines. The repository's ESLint `@stylistic` setup has no `padding-line-between-statements` or `lines-around-comment` rule; `padded-blocks`, `no-multiple-empty-lines` and `eol-last: never` never conflict with it (it does not add blank lines at block edges, add a second blank line, or touch the end of the file). Running `oxlint --fix` then `eslint --fix` twice on `packages/platform` and `apps/agents` gave identical results, so the fixers converge.

## Running the rule tests

The RuleTester suites need Node (Bun is not supported by `oxlint/plugins-dev`). From the repository root, `bun run test:lint-rules` (`scripts/test-lint-rules.mjs`) runs every suite in `rules/` and `effect/rules/` in its own Node process and fails when any suite fails. CI runs it in the quality job.

## Updating

Copy the new upstream `src/` next to this one, diff it against commit `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b`, port the changes, re-apply the local modifications above, update this file, then run `bun run test:lint-rules` and `bun run lint`.
