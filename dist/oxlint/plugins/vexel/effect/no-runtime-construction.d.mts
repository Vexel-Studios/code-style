declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let runtime: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        ImportDeclaration(node: any): void;
        MemberExpression(node: any): void;
        VariableDeclarator(node: any): void;
    };
}
export default _default;
