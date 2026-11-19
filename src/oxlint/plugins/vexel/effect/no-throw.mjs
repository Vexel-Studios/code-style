import { docsOf } from './ast.mjs';

/** Effect code fails with `return yield* new SomeError(...)`; a `throw` becomes an untyped defect (a 500). */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow `throw` in Effect code.' },
    messages: {
      throw: `Fail with a tagged error (\`return yield* new SomeError(...)\`) instead of throwing; {{docs}}. Only a callback API that requires a throw may disable this, with a description.`
    },
    schema: []
  },
  create(context) {
    return {
      ThrowStatement(node) {
        context.report({ data: { docs: docsOf(context) }, messageId: 'throw', node });
      }
    };
  }
};