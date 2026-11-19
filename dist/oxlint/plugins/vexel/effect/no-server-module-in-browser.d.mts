declare namespace _default {
    namespace meta {
        let type: string;
        namespace docs {
            let description: string;
        }
        namespace messages {
            let serverOnly: string;
            let unconfigured: string;
        }
        let schema: never[];
    }
    function create(context: any): {
        Program: (node: any) => any;
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
        Program?: undefined;
    };
}
export default _default;
