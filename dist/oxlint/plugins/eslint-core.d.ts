declare const eslintCorePlugin: {
    meta: {
        name: string;
    };
    rules: {
        [k: string]: import("eslint").Rule.RuleModule;
    };
};
export default eslintCorePlugin;
