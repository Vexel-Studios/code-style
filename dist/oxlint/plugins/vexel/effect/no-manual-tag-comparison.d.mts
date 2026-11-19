declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let tag: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        BinaryExpression(node: any): void;
        ObjectPattern(node: any): void;
        SwitchStatement(node: any): void;
    };
}
export default _default;
