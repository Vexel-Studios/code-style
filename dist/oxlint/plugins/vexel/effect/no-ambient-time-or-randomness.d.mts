declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let time: string;
            let random: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        CallExpression(node: any): void;
        MemberExpression(node: any): void;
        NewExpression(node: any): void;
    };
}
export default _default;
