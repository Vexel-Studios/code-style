declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        let schema: never[];
        namespace messages {
            let alias: string;
        }
    }
    function create(context: any): {
        ImportDeclaration(node: any): void;
        'Program > VariableDeclaration > VariableDeclarator'(node: any): void;
        'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator'(node: any): void;
        ExportDefaultDeclaration(node: any): void;
    };
}
export default _default;
