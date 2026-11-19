// Not named oxlint.config.ts or oxfmt.config.ts: consumers install this repository from git, files and all, and oxlint
// and oxfmt would pick a config with the standard name up as a nested config inside their node_modules.

import { defineConfig } from 'oxlint';
// The built config, so linting this repository also proves the published entry loads every plugin.
import { baseConfig } from './dist/oxlint/config.js';

export default defineConfig({
  extends: [baseConfig],
  // anti-slop keeps its upstream code; its RuleTester suites cover it.
  ignorePatterns: ['dist/**', 'src/oxlint/plugins/anti-slop/**']
});