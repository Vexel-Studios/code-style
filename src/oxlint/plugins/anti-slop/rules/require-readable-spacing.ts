import type { CreateRule } from "@oxlint/plugins";

import createPaddingLineRule from "../vendor/eslint-stylistic/padding-line-between-statements.ts";

// Pulse Onboard modification (see ../UPSTREAM.md): consecutive top-level re-exports
// (`export * from`, `export { x } from`) stay grouped like imports, so the agents Worker's entry,
// the one v2 module that re-exports (its classes, for Wrangler; no barrels since 2026-10-07), stays
// one compact block.
const topLevelReExport = "Program > :matches(ExportAllDeclaration, ExportNamedDeclaration[source])";

const paddingRule = createPaddingLineRule([
  { blankLine: "always", prev: "import", next: "*" },
  { blankLine: "always", prev: "*", next: { selector: "Program > :not(ImportDeclaration)" } },
  { blankLine: "always", prev: { selector: "Program > :not(ImportDeclaration)" }, next: "*" },
  { blankLine: "always", prev: "*", next: ["function", "class", "interface", "type"] },
  { blankLine: "always", prev: ["function", "class", "interface", "type"], next: "*" },
  {
    blankLine: "always",
    prev: "*",
    next: ["multiline-const", "multiline-let", "multiline-var", "multiline-using"],
  },
  {
    blankLine: "always",
    prev: ["multiline-const", "multiline-let", "multiline-var", "multiline-using"],
    next: "*",
  },
  { blankLine: "always", prev: "*", next: ["return", "if", "switch", "try", "for", "while", "do"] },
  { blankLine: "always", prev: "block-like", next: "*" },
  { blankLine: "any", prev: "import", next: "import" },
  { blankLine: "any", prev: { selector: topLevelReExport }, next: { selector: topLevelReExport } },
  {
    blankLine: "any",
    prev: {
      selector:
        ':matches(TSDeclareFunction, ExportNamedDeclaration[declaration.type="TSDeclareFunction"])',
    },
    next: {
      selector:
        ':matches(TSDeclareFunction, FunctionDeclaration, ExportNamedDeclaration[declaration.type="TSDeclareFunction"], ExportNamedDeclaration[declaration.type="FunctionDeclaration"])',
    },
  },
]);

/** Restore structural blank lines with whitespace-only fixes; keep local short bindings and overloads grouped. */
export const requireReadableSpacingRule: CreateRule = {
  ...paddingRule,
  meta: {
    ...paddingRule.meta,
    docs: {
      description: "Require readable spacing between declarations and logical statement groups.",
    },
    schema: [],
  },
};
