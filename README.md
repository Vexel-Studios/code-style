# @vexel-studios/code-style

The lint and format setup every Vexel Studios repository shares: oxlint for TypeScript, JavaScript and `.vue` script
blocks, oxfmt for layout, and a slim ESLint that runs only the eslint-plugin-vue rules that need the template.

| Entry | What it gives you |
| --- | --- |
| `@vexel-studios/code-style/oxlint` | `baseConfig` (extend it), plus rule sets to scope: `typeAwareRules`, `strictEffectRules`, `antiSlopRules`, `antiSlopEffectRules`, and `noReExportSelectors(message)` |
| `@vexel-studios/code-style/oxfmt` | `formatConfig` and `ignorePatterns` |
| `@vexel-studios/code-style/eslint-vue` | `vueTemplateConfig` (the whole `eslint.config.mjs`) and `vueTemplateRules` |

## Install

The package is served from this repository by git tag, so no registry token is needed anywhere:

```sh
bun add -d github:Vexel-Studios/code-style#v1.0.3 oxlint@1.94.0 oxfmt@0.79.0 eslint
```

`oxlint`, `oxfmt` and `eslint` are peer dependencies so their binaries land in the repository's `node_modules/.bin`;
`oxlint` and `oxfmt` are optional, because Vite+ (`vp lint`, `vp fmt`) brings its own. The plugins and parsers come
with this package.

## Use

`oxlint.config.ts`:

```ts
import { defineConfig } from 'oxlint';
import { antiSlopRules, baseConfig, ignorePatterns } from '@vexel-studios/code-style/oxlint';

export default defineConfig({
  extends: [baseConfig],
  // `extends` does not carry ignorePatterns over: list the shared ones again.
  ignorePatterns: [...ignorePatterns, 'apps/mobile/ios/**'],
  settings: {
    vexel: { ownModules: '^@acme/', docs: 'see docs/effect.md' }
  },
  overrides: [{ files: ['packages/platform/**'], rules: antiSlopRules }]
});
```

`oxfmt.config.ts`:

```ts
import { defineConfig } from 'oxfmt';
import { formatConfig, ignorePatterns } from '@vexel-studios/code-style/oxfmt';

export default defineConfig({ ...formatConfig, ignorePatterns: [...ignorePatterns, 'drizzle/**'] });
```

`eslint.config.mjs`:

```js
import { vueTemplateConfig } from '@vexel-studios/code-style/eslint-vue';

export default [...vueTemplateConfig, { ignores: ['apps/mobile/ios/**'] }];
```

Scripts: `lint` runs `oxlint && eslint .`, `lint:fix` runs `oxlint --fix && eslint . --fix && oxfmt`, and CI runs
`oxfmt --check`. With Vite+, spread `baseConfig` into `lint` and `formatConfig` into `fmt` in `vite.config.ts`.

## Rules

- **Base** (`baseConfig`): what `@nuxt/eslint-config` ran (core, TypeScript, import, Nuxt, the Vue script rules oxlint
  implements), as oxlint names them, plus `curly: multi-or-nest`, `unicorn/no-abusive-eslint-disable` and
  `vexel/require-disable-description`. No formatting rule: oxfmt owns layout.
- **`vexel` plugin** (`src/oxlint/plugins/vexel`): our own rules. The Effect rules (`no-throw`, `no-try-catch`,
  `no-type-assertion`, `no-runtime-construction`, ...) and `no-imported-alias` read the repository's specifics from
  `settings.vexel`: `ownModules`, `docs`, `runtimeEntry`, `serverOnlyModules`, `serverOnlyMessage` (see
  `effect/ast.mjs`).
- **`anti-slop`, `anti-slop-effect`**: vendored from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) (MIT);
  provenance and local changes in `src/oxlint/plugins/anti-slop/UPSTREAM.md`.
- **`eslint-core`**: ESLint's own `no-restricted-imports` and `no-restricted-syntax`, run unchanged inside oxlint.
  Oxlint's native `no-restricted-imports` compiles regex patterns with Rust's regex engine, which has no look-ahead;
  use `eslint-core/no-restricted-imports` for import boundaries that need it. In a `no-restricted-syntax` selector regex
  write `[.]` and `[/]`, not `\.` and `\/`: oxlint's selector parser takes no backslash escapes there.
- **Vue templates** (`vueTemplateRules`): the eslint-plugin-vue rules oxlint cannot run yet. Drop a rule here once
  oxlint implements it natively. In a `.vue` script block, disable an oxlint rule with `oxlint-disable-next-line`:
  ESLint also reads `.vue` files and reports an `eslint-disable` for a rule it does not know.
- **Type-aware** (`typeAwareRules`): opt in with `options: { typeAware: true }` once every TypeScript program resolves
  (run `nuxt prepare` first in Nuxt apps).

## Develop

```sh
bun install
bun run build      # tsc into dist/, which is committed: consumers install from git, without a build step
bun run test       # RuleTester suites (Node, not Bun)
bun run lint       # this repository, linted with the built config
bun run format
```

`dist/` is committed because a git dependency is installed as it is in the repository, and Node does not strip types
from files under `node_modules`. CI fails when `dist/` is out of date.

## Release

Bump `version` in `package.json`, run `bun run build`, commit, tag `vX.Y.Z` and push the tag. Repositories move by
changing the tag in their dependency.
