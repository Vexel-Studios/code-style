declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let safety: string;
            let lineLevel: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        Program(): void;
    };
}
export default _default;
