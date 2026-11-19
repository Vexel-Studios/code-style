/** Matches an ESLint or Oxlint disable comment: its kind, the rules it names and its description after `--`. */
const directivePattern = /^\s*(?:eslint|oxlint)-disable(-next-line|-line)?(?:\s+(?!--)([^]*?))?(?:\s+--\s*([^]*))?\s*$/u;
/**
 * A disabled `vexel/no-type-assertion` must say why that one assertion is safe: a line-level disable
 * (`eslint-disable-next-line` or `eslint-disable-line`) whose description starts with `SAFETY:`. A block or file
 * disable that names the rule, or disables every rule, would hide assertions nobody justified.
 */
export default {
    meta: {
        type: 'problem',
        docs: { description: 'Require a line-level `SAFETY:` disable for every type assertion.' },
        messages: {
            safety: 'Describe why this assertion is safe: `-- SAFETY: <the invariant the Schema decode guarantees>`.',
            lineLevel: 'Disable `vexel/no-type-assertion` per line (`eslint-disable-next-line ... -- SAFETY: ...`), never for a block or file.'
        },
        schema: []
    },
    create(context) {
        return {
            Program() {
                for (const comment of context.sourceCode.getAllComments()) {
                    const match = directivePattern.exec(comment.value);
                    if (!match)
                        continue;
                    const [, lineLevel, ruleList = '', description = ''] = match;
                    const rules = ruleList
                        .split(',')
                        .map(rule => rule.trim())
                        .filter(Boolean);
                    const namesRule = rules.includes('vexel/no-type-assertion');
                    if (!lineLevel && (namesRule || rules.length === 0))
                        context.report({ loc: comment.loc, messageId: 'lineLevel' });
                    else if (namesRule && !description.trim().startsWith('SAFETY:'))
                        context.report({ loc: comment.loc, messageId: 'safety' });
                }
            }
        };
    }
};
