declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let assertion: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        TSAsExpression: (node: any) => void;
        TSTypeAssertion: (node: any) => void;
    };
}
export default _default;
