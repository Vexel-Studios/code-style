declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let _try: string;
            export { _try as try };
        }
        let schema: never[];
    }
    function create(context: any): {
        TryStatement(node: any): void;
    };
}
export default _default;
