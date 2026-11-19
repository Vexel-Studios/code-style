import { builtinRules } from 'eslint/use-at-your-own-risk';
/**
 * ESLint core rules that oxlint does not implement, or implements without the options we rely on, run
 * unchanged as an oxlint JS plugin.
 *
 * - `no-restricted-imports`: oxlint's native rule compiles `regex` patterns with Rust's regex engine, which
 *   has no look-ahead or look-behind; the import boundaries need both.
 * - `no-restricted-syntax`: not implemented natively; we use it for the no-barrel and module-path selectors.
 *
 * Configure them under the `eslint-core/` prefix with exactly ESLint's options.
 */
const ruleNames = ['no-restricted-imports', 'no-restricted-syntax'];
const eslintCorePlugin = {
    meta: { name: 'eslint-core' },
    rules: Object.fromEntries(ruleNames.map(name => {
        const rule = builtinRules.get(name);
        if (!rule)
            throw new Error(`ESLint no longer ships the core rule ${name}.`);
        return [name, rule];
    }))
};
export default eslintCorePlugin;
