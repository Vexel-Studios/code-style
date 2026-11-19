import { toolFolders } from "../ignore-patterns.js";
/**
 * Our oxfmt style: Prettier's layout with the choices our code already made (single quotes, semicolons, no trailing
 * commas, 120 columns, `x => x`). Code ends without a final newline (the old `eol-last: never`); JSON and TOML keep the
 * one Bun, drizzle-kit and cargo write. Spread it into `oxfmt.config.ts` (or the `fmt` block of a Vite+ `vite.config.ts`) and add the
 * repository's `ignorePatterns` and, for Tailwind apps, `sortTailwindcss`.
 */
export const formatConfig = {
    arrowParens: 'avoid',
    endOfLine: 'lf',
    insertFinalNewline: false,
    overrides: [
        { files: ['**/*.json', '**/*.jsonc', '**/*.toml'], options: { insertFinalNewline: true } },
        // Tagged templates (html`...`, css`...`, sql`...`) build strings at runtime: reformatting their contents changes
        // the output, e.g. the HTML of an email. Vue files keep the default, which formats their <script> blocks.
        { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'], options: { embeddedLanguageFormatting: 'off' } }
    ],
    printWidth: 120,
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    sortPackageJson: false,
    trailingComma: 'none'
};
/** Files oxfmt leaves alone everywhere: prose and CI files are written by hand. */
export const ignorePatterns = [...toolFolders, '**/*.md', '**/*.yml', '**/*.yaml'];
