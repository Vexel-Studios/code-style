import type { Linter } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import { generatedFolders, toolFolders } from '../ignore-patterns.ts';

/**
 * The eslint-plugin-vue rules oxlint cannot run: the ones that need the template AST (an unused component, a v-for
 * without a key, attribute order, valid directives), and a few script rules oxlint has not implemented. Oxlint runs
 * every other rule, on `.vue` script blocks too; oxfmt formats templates, so no layout rule runs here. In a `.vue`
 * script block, disable an oxlint rule with `oxlint-disable-next-line`: ESLint also reads `.vue` files and reports an
 * `eslint-disable` for a rule it does not know.
 */
export const vueTemplateRules: Linter.RulesRecord = {
  'vue/attribute-hyphenation': 'error',
  'vue/attributes-order': [
    'error',
    {
      order: [
        'SLOT',
        'CONDITIONALS',
        'LIST_RENDERING',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'CONTENT',
        'RENDER_MODIFIERS',
        'ATTR_SHORTHAND_BOOL',
        'GLOBAL',
        'ATTR_STATIC',
        'UNIQUE',
        'DEFINITION',
        'ATTR_DYNAMIC',
        'EVENTS'
      ]
    }
  ],
  'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
  // Oxfmt writes void elements self-closed (`<input />`); the rest as before.
  'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
  // Lets `<!-- eslint-disable -->` comments in templates work.
  'vue/comment-directive': 'error',
  'vue/html-end-tags': 'warn',
  'vue/no-child-content': 'error',
  'vue/no-deprecated-dollar-listeners-api': 'error',
  'vue/no-deprecated-dollar-scopedslots-api': 'error',
  'vue/no-deprecated-filter': 'error',
  'vue/no-deprecated-functional-template': 'error',
  'vue/no-deprecated-html-element-is': 'error',
  'vue/no-deprecated-inline-template': 'error',
  'vue/no-deprecated-router-link-tag-prop': 'error',
  'vue/no-deprecated-scope-attribute': 'error',
  'vue/no-deprecated-slot-attribute': 'error',
  'vue/no-deprecated-slot-scope-attribute': 'error',
  'vue/no-deprecated-v-bind-sync': 'error',
  'vue/no-deprecated-v-is': 'error',
  'vue/no-deprecated-v-on-native-modifier': 'error',
  'vue/no-deprecated-v-on-number-modifiers': 'error',
  'vue/no-dupe-v-else-if': 'error',
  'vue/no-duplicate-attributes': 'error',
  'vue/no-lone-template': 'warn',
  'vue/no-multiple-template-root': 'error',
  'vue/no-mutating-props': 'error',
  'vue/no-parsing-error': 'error',
  'vue/no-ref-as-operand': 'error',
  'vue/no-template-key': 'error',
  'vue/no-template-shadow': 'warn',
  'vue/no-textarea-mustache': 'error',
  'vue/no-unused-components': 'error',
  'vue/no-unused-vars': 'error',
  'vue/no-use-computed-property-like-method': 'error',
  'vue/no-use-v-if-with-v-for': 'error',
  'vue/no-useless-template-attributes': 'error',
  'vue/no-v-html': 'warn',
  'vue/no-v-for-template-key-on-child': 'error',
  'vue/no-v-text-v-html-on-component': 'error',
  'vue/order-in-components': [
    'error',
    {
      order: [
        'name',
        'emits',
        'components',
        'mixins',
        'directives',
        'props',
        'setup',
        'data',
        'computed',
        'watch',
        'methods',
        'ROUTER_GUARDS',
        'LIFECYCLE_HOOKS'
      ]
    }
  ],
  'vue/require-component-is': 'error',
  'vue/require-explicit-emits': 'warn',
  'vue/require-toggle-inside-transition': 'error',
  'vue/require-v-for-key': 'error',
  'vue/require-valid-default-prop': 'error',
  'vue/this-in-template': 'warn',
  'vue/use-v-on-exact': 'error',
  'vue/v-bind-style': 'warn',
  'vue/v-on-event-hyphenation': 'warn',
  'vue/v-on-style': 'warn',
  'vue/v-slot-style': 'warn',
  'vue/valid-attribute-name': 'error',
  'vue/valid-template-root': 'error',
  'vue/valid-v-bind': 'error',
  'vue/valid-v-cloak': 'error',
  'vue/valid-v-else': 'error',
  'vue/valid-v-else-if': 'error',
  'vue/valid-v-for': 'error',
  'vue/valid-v-html': 'error',
  'vue/valid-v-if': 'error',
  'vue/valid-v-is': 'error',
  'vue/valid-v-memo': 'error',
  'vue/valid-v-model': 'error',
  'vue/valid-v-on': 'error',
  'vue/valid-v-once': 'error',
  'vue/valid-v-pre': 'error',
  'vue/valid-v-show': 'error',
  'vue/valid-v-slot': 'error',
  'vue/valid-v-text': 'error'
};

/**
 * ESLint flat config that lints only `.vue` files, only with `vueTemplateRules`. Spread it as the whole
 * `eslint.config.mjs` and add the repository's ignores. A page or layout renders inside Nuxt's transition, which needs
 * one root element, not a comment beside it.
 */
export const vueTemplateConfig: Linter.Config[] = [
  {
    name: 'code-style/ignores',
    ignores: [
      ...toolFolders,
      ...generatedFolders,
      // Oxlint lints scripts; ESLint has no rules for them.
      '**/*.{cjs,js,mjs,ts,mts,cts,tsx,jsx}'
    ]
  },
  {
    name: 'code-style/vue-templates',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        parser: typescriptParser,
        sourceType: 'module'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    plugins: {
      vue
    },
    processor: vue.processors['.vue'],
    rules: vueTemplateRules
  },
  {
    name: 'code-style/nuxt-roots',
    files: ['**/pages/**/*.vue', '**/layouts/**/*.vue', '**/*.server.vue'],
    rules: {
      'vue/no-multiple-template-root': ['error', { disallowComments: true }]
    }
  }
];