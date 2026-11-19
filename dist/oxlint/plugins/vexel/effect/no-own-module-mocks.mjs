import { docsOf, isMember, isOwnModuleOf, specifierOf } from './ast.mjs';
const sourceOf = node => (node?.type === 'ImportExpression' ? specifierOf(node.source) : specifierOf(node));
const rootIdentifier = node => {
    let current = node;
    while (current?.type === 'MemberExpression')
        current = current.object;
    return current?.type === 'Identifier' ? current.name : null;
};
/** Tests replace a service with a layer (`DatabaseTest`, `BlobTest`, ...), never by mocking our modules. */
export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow `vi.mock` and `vi.spyOn` of our own modules (`settings.vexel.ownModules`) in tests.'
        },
        messages: {
            mock: "Provide a test layer (the service's own, or a shared one such as `DatabaseTest`) instead of mocking one of our modules; {{docs}}."
        },
        schema: []
    },
    create(context) {
        const isOwnModule = isOwnModuleOf(context);
        const ownBindings = new Set();
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (isMember(callee, 'vi', 'mock') || isMember(callee, 'vi', 'doMock')) {
                    if (isOwnModule(sourceOf(node.arguments[0])))
                        context.report({ data: { docs: docsOf(context) }, messageId: 'mock', node });
                }
                else if (isMember(callee, 'vi', 'spyOn') && ownBindings.has(rootIdentifier(node.arguments[0])))
                    context.report({ data: { docs: docsOf(context) }, messageId: 'mock', node });
            },
            ImportDeclaration(node) {
                if (!isOwnModule(node.source.value))
                    return;
                for (const specifier of node.specifiers)
                    ownBindings.add(specifier.local.name);
            }
        };
    }
};
