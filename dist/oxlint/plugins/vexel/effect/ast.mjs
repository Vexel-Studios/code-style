/** Small AST helpers shared by the Effect rules in this folder. */
/** The name of a non-computed member's property, or of a computed string-literal property. */
export const propertyName = member => {
    if (member?.type !== 'MemberExpression')
        return null;
    if (!member.computed && member.property.type === 'Identifier')
        return member.property.name;
    return member.property.type === 'Literal' && typeof member.property.value === 'string' ? member.property.value : null;
};
/** The global objects code reaches globals through: `globalThis.Date`, `window.crypto`, `self.performance`. */
const globalObjects = new Set(['globalThis', 'global', 'self', 'window']);
/** Whether `node` names the global `name`, directly (`Date`) or through a global object (`globalThis.Date`). */
export const isGlobal = (node, name) => (node?.type === 'Identifier' && node.name === name) ||
    (node?.type === 'MemberExpression' &&
        node.object.type === 'Identifier' &&
        globalObjects.has(node.object.name) &&
        propertyName(node) === name);
/** Whether `node` is `<global>.<property>` (`Date.now`, `globalThis.process.env`), called or not. */
export const isGlobalMember = (node, objectName, property) => node?.type === 'MemberExpression' &&
    isGlobal(node.object, objectName) &&
    (property === undefined || propertyName(node) === property);
/** Whether `node` is `<objectName>.<property>` on a plain identifier (`vi.mock`). */
export const isMember = (node, objectName, property) => node?.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    node.object.name === objectName &&
    (property === undefined || propertyName(node) === property);
/** The string a module specifier names: a literal, or the text of a template literal without expressions. */
export const specifierOf = node => {
    if (node?.type === 'Literal' && typeof node.value === 'string')
        return node.value;
    if (node?.type === 'TemplateLiteral')
        return node.quasis.map(quasi => quasi.value.cooked ?? '').join('');
    return null;
};
/**
 * The repository's settings for the `vexel` rules: `settings.vexel` in the oxlint config.
 *
 * - `docs`: where the rule messages send the reader, e.g. `see docs/effect.md`.
 * - `ownModules`: a regular expression for the import sources that are the repository's own modules.
 * - `runtimeEntry`: the only place that may build a runtime, named in `no-runtime-construction`'s message.
 * - `serverOnlyModules`: a regular expression for the import sources browser code may not import, and
 *   `serverOnlyMessage`, what `no-server-module-in-browser` tells the reader instead.
 */
export const settingsOf = context => context.settings?.vexel ?? {};
/** Where the rule messages point: the repository's Effect guide. */
export const docsOf = context => settingsOf(context).docs ?? "see the repository's Effect guide";
/** Whether an import source names one of the repository's own modules (relative paths always do). */
export const isOwnModuleOf = context => {
    const own = settingsOf(context).ownModules;
    const pattern = own ? new RegExp(own, 'u') : null;
    return source => typeof source === 'string' && (source.startsWith('.') || (pattern?.test(source) ?? false));
};
