declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let _throw: string;
            export { _throw as throw };
        }
        let schema: never[];
    }
    function create(context: any): {
        ThrowStatement(node: any): void;
    };
}
export default _default;
