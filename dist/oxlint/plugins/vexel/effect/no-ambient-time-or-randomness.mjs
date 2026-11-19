import { docsOf, isGlobal, isGlobalMember, propertyName } from './ast.mjs';
/**
 * Time and randomness come from `Clock`/`DateTime` and `Random`, so tests control them (`TestClock`,
 * `Random.withSeed`). Refused whether called or passed on as a value.
 */
export default {
    meta: {
        type: 'problem',
        docs: { description: 'Disallow ambient time and randomness in Effect code.' },
        messages: {
            time: `Read the time from \`Clock\` or \`DateTime.now\` so tests can use \`TestClock\`; {{docs}}.`,
            random: `Use Effect's \`Random\` (crypto-backed in the request layer, seeded in tests), or the repository's ID helpers for record IDs; {{docs}}.`
        },
        schema: []
    },
    create(context) {
        return {
            CallExpression(node) {
                // `Date()` without `new` returns the current time as a string.
                if (isGlobal(node.callee, 'Date'))
                    context.report({ data: { docs: docsOf(context) }, messageId: 'time', node });
            },
            MemberExpression(node) {
                if (isGlobalMember(node, 'Date', 'now') || isGlobalMember(node, 'performance', 'now'))
                    context.report({ data: { docs: docsOf(context) }, messageId: 'time', node });
                else if (isGlobalMember(node, 'Math', 'random') ||
                    (isGlobalMember(node, 'crypto') && propertyName(node) === 'randomUUID'))
                    context.report({ data: { docs: docsOf(context) }, messageId: 'random', node });
            },
            NewExpression(node) {
                if (isGlobal(node.callee, 'Date') && node.arguments.length === 0)
                    context.report({ data: { docs: docsOf(context) }, messageId: 'time', node });
            }
        };
    }
};
