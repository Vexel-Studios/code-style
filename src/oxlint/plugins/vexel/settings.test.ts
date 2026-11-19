// The vexel rules read the repository's own module prefix, docs, server-only modules and runtime entry from
// `settings.vexel`; these cases pin that each rule honours them (and keeps working without them).
import { RuleTester } from 'oxlint/plugins-dev';

import noImportedAlias from './no-imported-alias.mjs';
import noOwnModuleMocks from './effect/no-own-module-mocks.mjs';
import noRuntimeConstruction from './effect/no-runtime-construction.mjs';
import noServerModuleInBrowser from './effect/no-server-module-in-browser.mjs';

const settings = {
  vexel: {
    docs: 'see docs/effect.md',
    ownModules: '^@acme/',
    runtimeEntry: '`packages/platform/runtime/`',
    serverOnlyModules: String.raw`^@acme/platform(?:/|$)`,
    serverOnlyMessage: 'Browser-safe code lives in @acme/shared.'
  }
};

const tester = new RuleTester({ languageOptions: { parserOptions: { lang: 'ts' } } });

// The rules are ESLint-format (`create` only); RuleTester's type also lists oxlint's optional `createOnce` form.
type TestedRule = Parameters<typeof tester.run>[1];
const eslintRule = (rule: object): TestedRule => rule as TestedRule;

tester.run('vexel/no-own-module-mocks', eslintRule(noOwnModuleMocks), {
  valid: [{ code: "vi.mock('@other/lib');", settings }, { code: "vi.mock('@acme/billing');" }],
  invalid: [
    { code: "vi.mock('@acme/billing');", settings, errors: [{ message: /see docs\/effect\.md/ }] },
    { code: "vi.mock('./database');", errors: [{ messageId: 'mock' }] },
    { code: "import { Db } from '@acme/db';\nvi.spyOn(Db, 'query');", settings, errors: [{ messageId: 'mock' }] }
  ]
});

tester.run('vexel/no-imported-alias', eslintRule(noImportedAlias), {
  valid: [
    { code: "import { Schema } from 'effect';\nexport const Name = Schema.String;", settings },
    { code: 'const limit = 3;\nexport const maxRetries = limit;', settings }
  ],
  invalid: [
    {
      code: "import { init } from '@acme/rpc';\nexport const procedure = init;",
      settings,
      errors: [{ messageId: 'alias' }]
    },
    { code: "import { init } from './rpc';\nexport default init;", errors: [{ messageId: 'alias' }] }
  ]
});

tester.run('vexel/no-server-module-in-browser', eslintRule(noServerModuleInBrowser), {
  valid: [
    { code: "import { Db } from '@acme/platform/db';" },
    { code: "import { Money } from '@acme/shared/money';", settings }
  ],
  invalid: [
    {
      code: "import { Db } from '@acme/platform/db';",
      settings,
      errors: [{ message: '`@acme/platform/db` is server-only. Browser-safe code lives in @acme/shared.' }]
    },
    { code: "const load = () => import('@acme/platform');", settings, errors: [{ messageId: 'serverOnly' }] }
  ]
});

tester.run('vexel/no-runtime-construction', eslintRule(noRuntimeConstruction), {
  valid: [{ code: "import { Effect } from 'effect';\nexport const program = Effect.succeed(1);", settings }],
  invalid: [
    {
      code: "import { Effect } from 'effect';\nEffect.runPromise(program);",
      settings,
      errors: [{ message: /only `packages\/platform\/runtime\/` may.*see docs\/effect\.md/ }]
    }
  ]
});