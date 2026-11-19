/**
 * Our own rules as one ESLint-format plugin, which oxlint loads as a JS plugin. They read only the syntax tree and
 * comments. Repository specifics (own module prefix, docs, server-only modules, runtime entry) come from
 * `settings.vexel` (see `effect/ast.mjs`). `require-disable-description` and `no-imported-alias` apply everywhere;
 * the Effect rules apply to the files a repository lists for them.
 */
declare const vexelPlugin: {
    meta: {
        name: string;
    };
    rules: {
        'no-ambient-config': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    config: string;
                    console: string;
                };
                schema: never[];
            };
            create(context: any): {
                CallExpression(node: any): void;
                ImportDeclaration(node: any): void;
                MemberExpression(node: any): void;
            };
        };
        'no-ambient-time-or-randomness': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    time: string;
                    random: string;
                };
                schema: never[];
            };
            create(context: any): {
                CallExpression(node: any): void;
                MemberExpression(node: any): void;
                NewExpression(node: any): void;
            };
        };
        'no-imported-alias': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                schema: never[];
                messages: {
                    alias: string;
                };
            };
            create(context: any): {
                ImportDeclaration(node: any): void;
                'Program > VariableDeclaration > VariableDeclarator'(node: any): void;
                'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator'(node: any): void;
                ExportDefaultDeclaration(node: any): void;
            };
        };
        'no-manual-tag-comparison': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    tag: string;
                };
                schema: never[];
            };
            create(context: any): {
                BinaryExpression(node: any): void;
                ObjectPattern(node: any): void;
                SwitchStatement(node: any): void;
            };
        };
        'no-own-module-mocks': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    mock: string;
                };
                schema: never[];
            };
            create(context: any): {
                CallExpression(node: any): void;
                ImportDeclaration(node: any): void;
            };
        };
        'no-runtime-construction': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    runtime: string;
                };
                schema: never[];
            };
            create(context: any): {
                ImportDeclaration(node: any): void;
                MemberExpression(node: any): void;
                VariableDeclarator(node: any): void;
            };
        };
        'no-server-module-in-browser': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    serverOnly: string;
                };
                schema: never[];
            };
            create(context: any): {
                CallExpression?: undefined;
                ExportAllDeclaration?: undefined;
                ExportNamedDeclaration?: undefined;
                ImportDeclaration?: undefined;
                ImportExpression?: undefined;
            } | {
                CallExpression(node: any): void;
                ExportAllDeclaration: (node: any) => void;
                ExportNamedDeclaration: (node: any) => any;
                ImportDeclaration: (node: any) => void;
                ImportExpression: (node: any) => void;
            };
        };
        'no-throw': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    throw: string;
                };
                schema: never[];
            };
            create(context: any): {
                ThrowStatement(node: any): void;
            };
        };
        'no-try-catch': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    try: string;
                };
                schema: never[];
            };
            create(context: any): {
                TryStatement(node: any): void;
            };
        };
        'no-type-assertion': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    assertion: string;
                };
                schema: never[];
            };
            create(context: any): {
                TSAsExpression: (node: any) => void;
                TSTypeAssertion: (node: any) => void;
            };
        };
        'require-disable-description': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    missing: string;
                };
                schema: never[];
            };
            create(context: any): {
                Program(): void;
            };
        };
        'type-assertion-safety': {
            meta: {
                type: string;
                docs: {
                    description: string;
                };
                messages: {
                    safety: string;
                    lineLevel: string;
                };
                schema: never[];
            };
            create(context: any): {
                Program(): void;
            };
        };
    };
};
export default vexelPlugin;
