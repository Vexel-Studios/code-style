// Not named oxlint.config.ts or oxfmt.config.ts: consumers install this repository from git, files and all, and oxlint
// and oxfmt would pick a config with the standard name up as a nested config inside their node_modules.

import { defineConfig } from 'oxfmt';
import { formatConfig, ignorePatterns } from './src/oxfmt/config.ts';

export default defineConfig({
  ...formatConfig,
  // dist is built output; anti-slop keeps its upstream style so later upstream updates merge cleanly.
  ignorePatterns: [...ignorePatterns, 'dist/**', 'src/oxlint/plugins/anti-slop/**']
});