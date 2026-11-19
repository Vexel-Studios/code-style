import noImportedAlias from './no-imported-alias.mjs';
import requireDisableDescription from './require-disable-description.mjs';
import noAmbientConfig from './effect/no-ambient-config.mjs';
import noAmbientTimeOrRandomness from './effect/no-ambient-time-or-randomness.mjs';
import noManualTagComparison from './effect/no-manual-tag-comparison.mjs';
import noOwnModuleMocks from './effect/no-own-module-mocks.mjs';
import noRuntimeConstruction from './effect/no-runtime-construction.mjs';
import noServerModuleInBrowser from './effect/no-server-module-in-browser.mjs';
import noThrow from './effect/no-throw.mjs';
import noTryCatch from './effect/no-try-catch.mjs';
import noTypeAssertion from './effect/no-type-assertion.mjs';
import typeAssertionSafety from './effect/type-assertion-safety.mjs';

/**
 * Our own rules as one ESLint-format plugin, which oxlint loads as a JS plugin. They read only the syntax tree and
 * comments. Repository specifics (own module prefix, docs, server-only modules, runtime entry) come from
 * `settings.vexel` (see `effect/ast.mjs`). `require-disable-description` and `no-imported-alias` apply everywhere;
 * the Effect rules apply to the files a repository lists for them.
 */
const vexelPlugin = {
  meta: { name: 'vexel' },
  rules: {
    'no-ambient-config': noAmbientConfig,
    'no-ambient-time-or-randomness': noAmbientTimeOrRandomness,
    'no-imported-alias': noImportedAlias,
    'no-manual-tag-comparison': noManualTagComparison,
    'no-own-module-mocks': noOwnModuleMocks,
    'no-runtime-construction': noRuntimeConstruction,
    'no-server-module-in-browser': noServerModuleInBrowser,
    'no-throw': noThrow,
    'no-try-catch': noTryCatch,
    'no-type-assertion': noTypeAssertion,
    'require-disable-description': requireDisableDescription,
    'type-assertion-safety': typeAssertionSafety
  }
};

export default vexelPlugin;