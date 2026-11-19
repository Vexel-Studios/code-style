declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let mock: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        CallExpression(node: any): void;
        ImportDeclaration(node: any): void;
    };
}
export default _default;
