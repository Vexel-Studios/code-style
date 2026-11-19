// Runs every RuleTester suite (`*.test.ts` under src/oxlint/plugins), each in its own Node process with type
// stripping. They need Node: `oxlint/plugins-dev` does not run under Bun.
import { spawnSync } from 'node:child_process';
import { globSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const suites = globSync('src/oxlint/plugins/**/*.test.ts', { cwd: root }).sort();

const failed = suites.filter(suite => {
  const result = spawnSync(process.execPath, ['--disable-warning=ExperimentalWarning', suite], {
    cwd: root,
    stdio: 'inherit'
  });

  return result.status !== 0;
});

if (failed.length > 0) {
  process.stderr.write(`rule suites failed:\n${failed.map(suite => `- ${suite}`).join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(`${suites.length} rule suites passed.\n`);