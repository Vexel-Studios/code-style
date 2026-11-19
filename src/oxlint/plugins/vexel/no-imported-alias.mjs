import { isOwnModuleOf } from './effect/ast.mjs';

const wrapperTypes = new Set(['TSAsExpression', 'TSSatisfiesExpression', 'TSNonNullExpression', 'ChainExpression']);

/**
 * Rejects `export const name = imported` (also through `imported.member`, a local const, destructuring,
 * a cast, or `export default imported`): it passes a value of our own modules on under another name, a
 * re-export that `no-restricted-syntax` selectors cannot see. Library imports may be renamed;
 * `settings.vexel.ownModules` (a regular expression on the import source) says which sources are ours.
 */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow exporting an import of our own modules under another name.' },
    schema: [],
    messages: {
      alias:
        '`{{name}}` only passes on an import of our own modules: import it from its module where it is used. No barrels or re-exports.'
    }
  },
  create(context) {
    const isOwnModule = isOwnModuleOf(context);
    const imported = new Set();

    const unwrap = node => (wrapperTypes.has(node?.type) ? unwrap(node.expression) : node);

    // The identifier a value reads (through member accesses), or undefined for anything computed.
    const rootOf = node => {
      let value = unwrap(node);

      while (value?.type === 'MemberExpression' && !value.computed) value = unwrap(value.object);

      return value?.type === 'Identifier' ? value.name : undefined;
    };

    const passedOn = node => {
      const root = rootOf(node);

      return root !== undefined && imported.has(root);
    };

    return {
      'ImportDeclaration'(node) {
        if (!isOwnModule(node.source.value)) return;

        for (const specifier of node.specifiers) imported.add(specifier.local.name);
      },
      // A top-level local const that only holds an import passes it on when it is exported.
      'Program > VariableDeclaration > VariableDeclarator'(node) {
        if (node.id.type === 'Identifier' && passedOn(node.init)) imported.add(node.id.name);
      },
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator'(node) {
        if (passedOn(node.init)) {
          context.report({
            node,
            messageId: 'alias',
            data: { name: node.id.type === 'Identifier' ? node.id.name : 'a destructured export' }
          });
        }
      },
      'ExportDefaultDeclaration'(node) {
        if (passedOn(node.declaration)) context.report({ node, messageId: 'alias', data: { name: 'default' } });
      }
    };
  }
};