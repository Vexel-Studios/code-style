import { docsOf } from './ast.mjs';

/** Promise APIs go through `Effect.tryPromise`, failures are handled with `Effect.catchTag`. */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow `try`/`catch` in Effect code.' },
    messages: {
      try: `Use \`Effect.try\`/\`Effect.tryPromise\` with a tagged error and handle it with \`Effect.catchTag\`; {{docs}}. Only a callback API that forces it may disable this, with a description.`
    },
    schema: []
  },
  create(context) {
    return {
      TryStatement(node) {
        context.report({ data: { docs: docsOf(context) }, messageId: 'try', node });
      }
    };
  }
};