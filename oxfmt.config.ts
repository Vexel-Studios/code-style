import { defineConfig } from 'oxfmt';
import { formatConfig, ignorePatterns } from './src/oxfmt/config.ts';

export default defineConfig({
  ...formatConfig,
  // dist is built output; anti-slop keeps its upstream style so later upstream updates merge cleanly.
  ignorePatterns: [...ignorePatterns, 'dist/**', 'src/oxlint/plugins/anti-slop/**']
});