import { docsOf, isGlobalMember } from './ast.mjs';

/** Server code in packages reads configuration from `AppConfig` and logs through Effect's logger (evlog). */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow process.env, import.meta.env, useRuntimeConfig() and console in package server code.'
    },
    messages: {
      config: `Read configuration from \`AppConfig\`, which \`apps/web\` fills; {{docs}}.`,
      console: `Log with \`Effect.logInfo\`/\`logWarning\`/\`logError\`, which write to the request's evlog event; {{docs}}.`
    },
    schema: []
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'useRuntimeConfig')
          context.report({ data: { docs: docsOf(context) }, messageId: 'config', node });
      },
      ImportDeclaration(node) {
        if (node.source.value === 'process' || node.source.value === 'node:process')
          context.report({ data: { docs: docsOf(context) }, messageId: 'config', node });
      },
      MemberExpression(node) {
        if (isGlobalMember(node, 'process', 'env'))
          context.report({ data: { docs: docsOf(context) }, messageId: 'config', node });
        else if (
          node.object.type === 'MetaProperty' &&
          node.object.meta.name === 'import' &&
          node.property.name === 'env'
        )
          context.report({ data: { docs: docsOf(context) }, messageId: 'config', node });
        else if (isGlobalMember(node, 'console'))
          context.report({ data: { docs: docsOf(context) }, messageId: 'console', node });
      }
    };
  }
};