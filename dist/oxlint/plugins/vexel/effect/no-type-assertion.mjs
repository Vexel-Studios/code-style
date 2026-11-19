import { docsOf } from './ast.mjs';
const isConst = typeAnnotation => typeAnnotation.type === 'TSTypeReference' &&
    typeAnnotation.typeName.type === 'Identifier' &&
    typeAnnotation.typeName.name === 'const';
/**
 * A type assertion tells the compiler to stop checking. `as const` is fine. Right after a Schema decode an assertion
 * can be justified; disable this rule there with a description that starts with `SAFETY:` naming the invariant
 * (`vexel/type-assertion-safety` checks the description).
 */
export default {
    meta: {
        type: 'problem',
        docs: { description: 'Disallow type assertions other than `as const`.' },
        messages: {
            assertion: `Decode with Schema or narrow with a type guard instead of asserting a type; {{docs}}. Directly after a Schema decode, disable with \`-- SAFETY: <invariant>\`.`
        },
        schema: []
    },
    create(context) {
        const check = node => {
            if (!isConst(node.typeAnnotation))
                context.report({ data: { docs: docsOf(context) }, messageId: 'assertion', node });
        };
        return {
            TSAsExpression: check,
            TSTypeAssertion: check
        };
    }
};
