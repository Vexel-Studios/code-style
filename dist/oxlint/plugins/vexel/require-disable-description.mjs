/** `eslint-disable`, `eslint-disable-line`, `eslint-disable-next-line`, `eslint-enable` and their `oxlint-` forms. */
const directive = /^\s*(?:eslint|oxlint)-(?:disable|disable-line|disable-next-line|enable)(?:\s|$)/u;
/**
 * Every lint directive says why, after ` -- `: `// eslint-disable-next-line vexel/no-throw -- <reason>`. Replaces
 * eslint-plugin-eslint-comments' `require-description`, whose reports Oxlint cannot place (it reports at column -1).
 */
export default {
    meta: {
        type: 'suggestion',
        docs: { description: 'Require a description (` -- why`) on every eslint-disable and oxlint-disable comment.' },
        messages: {
            missing: 'Say why this rule is disabled: add ` -- <reason>` after the rule names.'
        },
        schema: []
    },
    create(context) {
        return {
            Program() {
                for (const comment of context.sourceCode.getAllComments()) {
                    if (!directive.test(comment.value))
                        continue;
                    const description = comment.value.split(/\s--\s/u)[1] ?? '';
                    if (description.trim() === '')
                        context.report({ loc: comment.loc, messageId: 'missing' });
                }
            }
        };
    }
};
