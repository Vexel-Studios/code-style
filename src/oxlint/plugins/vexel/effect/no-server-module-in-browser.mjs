import { settingsOf, specifierOf } from './ast.mjs';

/**
 * Nothing the browser can load may import a server-only module, statically, dynamically, by `require` or by path.
 * `settings.vexel.serverOnlyModules` is a regular expression for those import sources (a package name, the relative
 * and alias paths into its folder); `settings.vexel.serverOnlyMessage` says where browser-safe code lives instead.
 * Scope the rule to browser-reachable files with `files`/`excludeFiles` in the oxlint config.
 */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow importing server-only modules from browser-reachable code.' },
    messages: {
      serverOnly: '`{{source}}` is server-only. {{hint}}',
      unconfigured: 'Set `settings.vexel.serverOnlyModules` in the oxlint config: without it this rule checks nothing.'
    },
    schema: []
  },
  create(context) {
    const { serverOnlyModules, serverOnlyMessage } = settingsOf(context);

    if (!serverOnlyModules) return { Program: node => context.report({ messageId: 'unconfigured', node }) };

    const serverOnly = new RegExp(serverOnlyModules, 'u');
    const hint = serverOnlyMessage ?? 'Move browser-safe code into a shared module.';

    const check = (node, source) => {
      const specifier = specifierOf(source);

      if (specifier !== null && serverOnly.test(specifier))
        context.report({ data: { hint, source: specifier }, messageId: 'serverOnly', node });
    };

    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'require') check(node, node.arguments[0]);
      },
      ExportAllDeclaration: node => check(node, node.source),
      ExportNamedDeclaration: node => node.source && check(node, node.source),
      ImportDeclaration: node => check(node, node.source),
      ImportExpression: node => check(node, node.source)
    };
  }
};