import { defineConfig } from 'oxlint';
// The built config, so linting this repository also proves the published entry loads every plugin.
import { baseConfig } from './dist/oxlint/config.js';

export default defineConfig({
  extends: [baseConfig],
  // anti-slop keeps its upstream code; its RuleTester suites cover it.
  ignorePatterns: ['dist/**', 'src/oxlint/plugins/anti-slop/**']
});