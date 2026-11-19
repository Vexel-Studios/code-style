import { docsOf, propertyName } from './ast.mjs';

const isTagAccess = node => node.type === 'MemberExpression' && propertyName(node) === '_tag';

const isTagKey = key =>
  (key.type === 'Identifier' && key.name === '_tag') || (key.type === 'Literal' && key.value === '_tag');

/** Failures are handled by tag with Effect's combinators, which keep the error channel typed. */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow comparing or destructuring `_tag` by hand.' },
    messages: {
      tag: `Handle tagged values with \`Effect.catchTag\`/\`catchTags\`, \`Predicate.isTagged\` or \`Match.tag\` instead of reading \`_tag\`; {{docs}}.`
    },
    schema: []
  },
  create(context) {
    return {
      BinaryExpression(node) {
        if (['==', '===', '!=', '!=='].includes(node.operator) && (isTagAccess(node.left) || isTagAccess(node.right)))
          context.report({ data: { docs: docsOf(context) }, messageId: 'tag', node });
      },
      // `const { _tag } = error` only exists to compare the tag by hand afterwards.
      ObjectPattern(node) {
        for (const property of node.properties) {
          if (property.type === 'Property' && isTagKey(property.key))
            context.report({ data: { docs: docsOf(context) }, messageId: 'tag', node: property });
        }
      },
      SwitchStatement(node) {
        if (isTagAccess(node.discriminant))
          context.report({ data: { docs: docsOf(context) }, messageId: 'tag', node: node.discriminant });
      }
    };
  }
};