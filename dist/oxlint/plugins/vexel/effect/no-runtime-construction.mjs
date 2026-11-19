import { docsOf, propertyName, settingsOf } from './ast.mjs';
/** Whether `name` on each module builds a runtime or runs an Effect. Every `Effect.run*` does. */
const builders = {
    Effect: name => /^run[A-Z]/u.test(name),
    Layer: name => ['build', 'buildWithMemoMap', 'buildWithScope', 'launch'].includes(name),
    ManagedRuntime: name => name === 'make'
};
/** The module a specifier imports as a whole: `effect/Effect` is `Effect`. */
const moduleOfSpecifier = {
    'effect/Effect': 'Effect',
    'effect/Layer': 'Layer',
    'effect/ManagedRuntime': 'ManagedRuntime'
};
/**
 * Only the runtime entry points (`settings.vexel.runtimeEntry`, e.g. `runEffect`) build a runtime; everything else stays in
 * Effect. Every `Effect.run*` (`runPromise`, `runForkWith`, ...) counts. Catches member access (`Effect.runPromise`, `Fx.runFork` for `import { Effect as Fx }`, `effect.Effect.runSync` for
 * `import * as effect from 'effect'`, `E.runSync` for
 * `import * as E from 'effect/Effect'`), destructuring (`const { runPromise } = Effect`) and named imports from the
 * module files (`import { runPromise } from 'effect/Effect'`).
 */
export default {
    meta: {
        type: 'problem',
        docs: { description: 'Disallow running Effects or building runtimes outside the runtime entry points.' },
        messages: {
            runtime: `\`{{name}}\` builds a runtime; only {{entry}} may. Return the Effect and let the caller run it; {{docs}}.`
        },
        schema: []
    },
    create(context) {
        /** Local names bound to a module: the default names plus aliases from imports. */
        const modules = new Map(Object.keys(builders).map(name => [name, name]));
        /** Local names bound to the whole `effect` package (`import * as effect from 'effect'`). */
        const packages = new Set();
        const report = (node, module, name) => {
            if (builders[module]?.(name)) {
                context.report({
                    data: {
                        docs: docsOf(context),
                        entry: settingsOf(context).runtimeEntry ?? 'the runtime entry points',
                        name: `${module}.${name}`
                    },
                    messageId: 'runtime',
                    node
                });
            }
        };
        return {
            ImportDeclaration(node) {
                const source = node.source.value;
                const fileModule = moduleOfSpecifier[source];
                for (const specifier of node.specifiers) {
                    if (fileModule && specifier.type === 'ImportNamespaceSpecifier')
                        modules.set(specifier.local.name, fileModule);
                    else if (fileModule && specifier.type === 'ImportSpecifier')
                        report(specifier, fileModule, specifier.imported.name ?? specifier.imported.value);
                    else if (source === 'effect' && specifier.type === 'ImportSpecifier' && builders[specifier.imported.name])
                        modules.set(specifier.local.name, specifier.imported.name);
                    else if (source === 'effect' && specifier.type === 'ImportNamespaceSpecifier')
                        packages.add(specifier.local.name);
                }
            },
            MemberExpression(node) {
                const name = propertyName(node);
                if (node.object.type === 'Identifier' && name && modules.has(node.object.name))
                    report(node, modules.get(node.object.name), name);
                // `effect.Effect.runPromise` through `import * as effect from 'effect'`.
                else if (name &&
                    node.object.type === 'MemberExpression' &&
                    node.object.object.type === 'Identifier' &&
                    packages.has(node.object.object.name) &&
                    builders[propertyName(node.object)])
                    report(node, propertyName(node.object), name);
            },
            VariableDeclarator(node) {
                if (node.id.type !== 'ObjectPattern' || node.init?.type !== 'Identifier' || !modules.has(node.init.name))
                    return;
                for (const property of node.id.properties) {
                    if (property.type === 'Property' && property.key.type === 'Identifier')
                        report(property, modules.get(node.init.name), property.key.name);
                }
            }
        };
    }
};
