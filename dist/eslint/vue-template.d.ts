import type { Linter } from 'eslint';
/**
 * The eslint-plugin-vue rules oxlint cannot run: the ones that need the template AST (an unused component, a v-for
 * without a key, attribute order, valid directives), and a few script rules oxlint has not implemented. Oxlint runs
 * every other rule, on `.vue` script blocks too; oxfmt formats templates, so no layout rule runs here. In a `.vue`
 * script block, disable an oxlint rule with `oxlint-disable-next-line`: ESLint also reads `.vue` files and reports an
 * `eslint-disable` for a rule it does not know.
 */
export declare const vueTemplateRules: Linter.RulesRecord;
/**
 * ESLint flat config that lints only `.vue` files, only with `vueTemplateRules`. Spread it as the whole
 * `eslint.config.mjs` and add the repository's ignores. A page or layout renders inside Nuxt's transition, which needs
 * one root element, not a comment beside it.
 */
export declare const vueTemplateConfig: Linter.Config[];
