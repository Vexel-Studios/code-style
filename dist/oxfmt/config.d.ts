/**
 * Our oxfmt style: Prettier's layout with the choices our code already made (single quotes, semicolons, no trailing
 * commas, 120 columns, `x => x`). Code ends without a final newline (the old `eol-last: never`); JSON keeps the one Bun
 * and drizzle-kit write. Spread it into `oxfmt.config.ts` (or the `fmt` block of a Vite+ `vite.config.ts`) and add the
 * repository's `ignorePatterns` and, for Tailwind apps, `sortTailwindcss`.
 */
export declare const formatConfig: {
    arrowParens: "avoid";
    endOfLine: "lf";
    insertFinalNewline: false;
    overrides: {
        files: string[];
        options: {
            insertFinalNewline: true;
        };
    }[];
    printWidth: number;
    quoteProps: "consistent";
    semi: true;
    singleQuote: true;
    sortPackageJson: false;
    trailingComma: "none";
};
/** Files oxfmt leaves alone everywhere: prose and CI files are written by hand. */
export declare const ignorePatterns: string[];
