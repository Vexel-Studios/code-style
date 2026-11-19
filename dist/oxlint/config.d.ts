/**
 * The JS plugins the base config registers. Registering a plugin enables none of its rules.
 *
 * - `vexel`: our own rules (`plugins/vexel`), configured through `settings.vexel`.
 * - `anti-slop`, `anti-slop-effect`: the vendored anti-slop rules (`plugins/anti-slop/UPSTREAM.md`).
 * - `eslint-core`: ESLint's `no-restricted-imports` and `no-restricted-syntax`, unchanged (`plugins/eslint-core.ts`).
 * - `nuxt`: `@nuxt/eslint-plugin`, the rules `@nuxt/eslint-config` ran.
 */
export declare const jsPlugins: {
    name: string;
    specifier: string;
}[];
/** Build output, caches and tool folders no repository lints. Add the repository's own on top. */
export declare const ignorePatterns: string[];
/**
 * The rules every repository runs: what `@nuxt/eslint-config` ran (core, TypeScript, import, Nuxt), as oxlint
 * names them, plus our house rules. Layout is oxfmt's job, so no formatting rule is here.
 */
export declare const rules: {
    curly: ["error", "multi-or-nest"];
    'for-direction': "error";
    'no-async-promise-executor': "error";
    'no-case-declarations': "error";
    'no-compare-neg-zero': "error";
    'no-cond-assign': ["error", "except-parens"];
    'no-constant-binary-expression': "error";
    'no-constant-condition': ["error", {
        checkLoops: "allExceptWhileTrue";
    }];
    'no-control-regex': "error";
    'no-debugger': "error";
    'no-delete-var': "error";
    'no-dupe-else-if': "error";
    'no-duplicate-case': "error";
    'no-empty': "error";
    'no-empty-character-class': "error";
    'no-empty-pattern': "error";
    'no-empty-static-block': "error";
    'no-ex-assign': "error";
    'no-extra-boolean-cast': "error";
    'no-fallthrough': "error";
    'no-global-assign': "error";
    'no-invalid-regexp': "error";
    'no-irregular-whitespace': "error";
    'no-loss-of-precision': "error";
    'no-misleading-character-class': "error";
    'no-nonoctal-decimal-escape': "error";
    'no-prototype-builtins': "error";
    'no-regex-spaces': "error";
    'no-self-assign': ["error", {
        props: true;
    }];
    'no-shadow-restricted-names': ["error", {
        reportGlobalThis: true;
    }];
    'no-sparse-arrays': "error";
    'no-unassigned-vars': "error";
    'no-unexpected-multiline': "error";
    'no-unsafe-finally': "error";
    'no-unsafe-optional-chaining': "error";
    'no-unused-labels': "error";
    'no-unused-private-class-members': "error";
    'no-useless-assignment': "error";
    'no-useless-backreference': "error";
    'no-useless-catch': "error";
    'no-useless-escape': "error";
    'no-var': "error";
    'prefer-const': ["error", {
        destructuring: "any";
    }];
    'prefer-rest-params': "error";
    'prefer-spread': "error";
    'preserve-caught-error': "error";
    'require-yield': "error";
    'use-isnan': "error";
    'typescript/ban-ts-comment': ["error", {
        minimumDescriptionLength: number;
    }];
    'typescript/consistent-type-imports': ["error", {
        disallowTypeAnnotations: false;
        prefer: "type-imports";
    }];
    'typescript/no-array-constructor': "error";
    'typescript/no-duplicate-enum-values': "error";
    'typescript/no-dynamic-delete': "error";
    'typescript/no-empty-object-type': "error";
    'typescript/no-explicit-any': "error";
    'typescript/no-extra-non-null-assertion': "error";
    'typescript/no-extraneous-class': "error";
    'typescript/no-import-type-side-effects': "error";
    'typescript/no-invalid-void-type': "error";
    'typescript/no-misused-new': "error";
    'typescript/no-namespace': "error";
    'typescript/no-non-null-asserted-nullish-coalescing': "error";
    'typescript/no-non-null-asserted-optional-chain': "error";
    'typescript/no-require-imports': "error";
    'typescript/no-this-alias': "error";
    'typescript/no-unnecessary-type-constraint': "error";
    'typescript/no-unsafe-declaration-merging': "error";
    'typescript/no-unsafe-function-type': "error";
    'typescript/no-unused-expressions': "error";
    'typescript/no-unused-vars': ["error", {
        argsIgnorePattern: "^_";
        ignoreRestSiblings: true;
        varsIgnorePattern: "^_";
    }];
    'typescript/no-useless-constructor': "error";
    'typescript/no-wrapper-object-types': "error";
    'typescript/prefer-as-const': "error";
    'typescript/prefer-literal-enum-member': "error";
    'typescript/prefer-namespace-keyword': "error";
    'typescript/triple-slash-reference': "error";
    'typescript/unified-signatures': "error";
    'import/first': "error";
    'import/newline-after-import': ["error", {
        count: number;
    }];
    'import/no-duplicates': "error";
    'import/no-mutable-exports': "error";
    'import/no-named-default': "error";
    'unicorn/no-abusive-eslint-disable': "error";
    'nuxt/prefer-import-meta': "error";
    'vexel/require-disable-description': "error";
};
/** The eslint-plugin-vue rules oxlint runs natively on `.vue` script blocks, at eslint-plugin-vue's recommended level. */
export declare const vueScriptRules: {
    'vue/component-definition-name-casing': "warn";
    'vue/no-arrow-functions-in-watch': "error";
    'vue/no-async-in-computed-properties': "error";
    'vue/no-computed-properties-in-data': "error";
    'vue/no-deprecated-data-object-declaration': "error";
    'vue/no-deprecated-delete-set': "error";
    'vue/no-deprecated-destroyed-lifecycle': "error";
    'vue/no-deprecated-events-api': "error";
    'vue/no-deprecated-model-definition': "error";
    'vue/no-deprecated-props-default-this': "error";
    'vue/no-deprecated-vue-config-keycodes': "error";
    'vue/no-dupe-keys': "error";
    'vue/no-export-in-script-setup': "error";
    'vue/no-expose-after-await': "error";
    'vue/no-lifecycle-after-await': "error";
    'vue/no-multiple-slot-args': "warn";
    'vue/no-required-prop-with-default': "warn";
    'vue/no-reserved-keys': "error";
    'vue/no-reserved-props': "error";
    'vue/no-shared-component-data': "error";
    'vue/no-side-effects-in-computed-properties': "error";
    'vue/no-watch-after-await': "error";
    'vue/prefer-import-from-vue': "error";
    'vue/prop-name-casing': "warn";
    'vue/require-prop-type-constructor': "error";
    'vue/require-prop-types': "warn";
    'vue/require-render-return': "error";
    'vue/require-slots-as-functions': "error";
    'vue/return-in-computed-property': "error";
    'vue/return-in-emits-validator': "error";
    'vue/valid-define-emits': "error";
    'vue/valid-define-options': "error";
    'vue/valid-define-props': "error";
    'vue/valid-next-tick': "error";
};
/**
 * Type-aware rules: oxlint's correctness set, except three that flag deliberate code (no-misused-spread on `[...text]`
 * to count code points, no-base-to-string on `String(value)` of unknown cells, require-array-sort-compare on
 * order-insensitive `toSorted()`). Turn them on with `options.typeAware: true`; every TypeScript program must resolve
 * first (run `nuxt prepare` before linting a Nuxt app).
 */
export declare const typeAwareRules: {
    'typescript/await-thenable': "error";
    'typescript/no-array-delete': "error";
    'typescript/no-duplicate-type-constituents': "error";
    'typescript/no-floating-promises': "error";
    'typescript/no-for-in-array': "error";
    'typescript/no-implied-eval': "error";
    'typescript/no-meaningless-void-operator': "error";
    'typescript/no-redundant-type-constituents': "error";
    'typescript/no-unsafe-unary-minus': "error";
    'typescript/no-useless-default-assignment': "error";
    'typescript/restrict-template-expressions': "error";
    'typescript/unbound-method': "error";
};
/** The strict Effect rules, for the files a repository has moved to Effect (set `settings.vexel` with them). */
export declare const strictEffectRules: {
    'vexel/no-ambient-config': "error";
    'vexel/no-ambient-time-or-randomness': "error";
    'vexel/no-manual-tag-comparison': "error";
    'vexel/no-own-module-mocks': "error";
    'vexel/no-runtime-construction': "error";
    'vexel/no-throw': "error";
    'vexel/no-try-catch': "error";
    'vexel/no-type-assertion': "error";
    'vexel/type-assertion-safety': "error";
    'typescript/no-non-null-assertion': "error";
};
/** Every anti-slop rule, plus its native companion, for the files a repository holds to them. */
export declare const antiSlopRules: {
    'oxc/no-accumulating-spread': "error";
    'anti-slop/no-array-filter-map': "error";
    'anti-slop/no-reduce-accumulator-copy': "error";
    'anti-slop/no-chained-type-assertions': "error";
    'anti-slop/no-conditional-empty-object-spread': "error";
    'anti-slop/no-known-value-widening': "error";
    'anti-slop/no-module-mocking': "error";
    'anti-slop/no-object-parameters': "error";
    'anti-slop/no-reflect-apply': "error";
    'anti-slop/no-reflect-get': "error";
    'anti-slop/no-runtime-typeof': "error";
    'anti-slop/no-shape-in-symbol-names': "error";
    'anti-slop/no-unknown-parameters': "error";
    'anti-slop/no-unknown-returns': "error";
    'anti-slop/no-unknown-type-aliases': "error";
    'anti-slop/no-unsafe-dictionary-type': "error";
    'anti-slop/no-widen-then-assert': "error";
    'anti-slop/require-readable-spacing': "error";
    'anti-slop/require-safety-comment-for-type-assertion': "error";
};
/** Every anti-slop Effect rule. */
export declare const antiSlopEffectRules: {
    'anti-slop-effect/no-manual-effect-error-tag': "error";
    'anti-slop-effect/no-manual-tag-comparison': "error";
    'anti-slop-effect/no-manual-tagged-construction': "error";
    'anti-slop-effect/no-service-constructor-imports': "error";
    'anti-slop-effect/prefer-effect-match': "error";
};
/**
 * `no-restricted-syntax` selectors for "no barrels or re-exports": a module exports only what it declares. Use them
 * with `eslint-core/no-restricted-syntax`, minus `reExport` (keep `exportAll`) in the files a runtime or tool needs
 * to re-export from (a Worker entry, a drizzle-kit schema).
 */
export declare const noReExportSelectors: (message: string) => {
    exportAll: {
        selector: string;
        message: string;
    }[];
    reExport: {
        selector: string;
        message: string;
    }[];
};
/** The Nuxt rules `@nuxt/eslint-config` ran on pages and on `nuxt.config`, and the Vue script rules. */
export declare const overrides: ({
    files: string[];
    rules: {
        'nuxt/no-page-meta-runtime-values': "error";
        'nuxt/no-nuxt-config-test-key'?: undefined;
        'nuxt/nuxt-config-keys-order'?: undefined;
    };
} | {
    files: string[];
    rules: {
        'nuxt/no-nuxt-config-test-key': "error";
        'nuxt/nuxt-config-keys-order': "error";
        'nuxt/no-page-meta-runtime-values'?: undefined;
    };
} | {
    files: string[];
    rules: {
        'vue/component-definition-name-casing': "warn";
        'vue/no-arrow-functions-in-watch': "error";
        'vue/no-async-in-computed-properties': "error";
        'vue/no-computed-properties-in-data': "error";
        'vue/no-deprecated-data-object-declaration': "error";
        'vue/no-deprecated-delete-set': "error";
        'vue/no-deprecated-destroyed-lifecycle': "error";
        'vue/no-deprecated-events-api': "error";
        'vue/no-deprecated-model-definition': "error";
        'vue/no-deprecated-props-default-this': "error";
        'vue/no-deprecated-vue-config-keycodes': "error";
        'vue/no-dupe-keys': "error";
        'vue/no-export-in-script-setup': "error";
        'vue/no-expose-after-await': "error";
        'vue/no-lifecycle-after-await': "error";
        'vue/no-multiple-slot-args': "warn";
        'vue/no-required-prop-with-default': "warn";
        'vue/no-reserved-keys': "error";
        'vue/no-reserved-props': "error";
        'vue/no-shared-component-data': "error";
        'vue/no-side-effects-in-computed-properties': "error";
        'vue/no-watch-after-await': "error";
        'vue/prefer-import-from-vue': "error";
        'vue/prop-name-casing': "warn";
        'vue/require-prop-type-constructor': "error";
        'vue/require-prop-types': "warn";
        'vue/require-render-return': "error";
        'vue/require-slots-as-functions': "error";
        'vue/return-in-computed-property': "error";
        'vue/return-in-emits-validator': "error";
        'vue/valid-define-emits': "error";
        'vue/valid-define-options': "error";
        'vue/valid-define-props': "error";
        'vue/valid-next-tick': "error";
    };
})[];
/**
 * The base oxlint config. Use it as `extends: [baseConfig]` in `oxlint.config.ts`, or spread it into the `lint`
 * block of a Vite+ `vite.config.ts`, then add the repository's ignores, settings and scoped overrides. `extends` does
 * not carry `ignorePatterns` over: an `oxlint.config.ts` must list `...ignorePatterns` itself.
 */
export declare const baseConfig: {
    plugins: ("vue" | "eslint" | "unicorn" | "typescript" | "oxc" | "import")[];
    jsPlugins: {
        name: string;
        specifier: string;
    }[];
    categories: {
        correctness: "off";
    };
    options: {
        reportUnusedDisableDirectives: "error";
    };
    ignorePatterns: string[];
    rules: {
        curly: ["error", "multi-or-nest"];
        'for-direction': "error";
        'no-async-promise-executor': "error";
        'no-case-declarations': "error";
        'no-compare-neg-zero': "error";
        'no-cond-assign': ["error", "except-parens"];
        'no-constant-binary-expression': "error";
        'no-constant-condition': ["error", {
            checkLoops: "allExceptWhileTrue";
        }];
        'no-control-regex': "error";
        'no-debugger': "error";
        'no-delete-var': "error";
        'no-dupe-else-if': "error";
        'no-duplicate-case': "error";
        'no-empty': "error";
        'no-empty-character-class': "error";
        'no-empty-pattern': "error";
        'no-empty-static-block': "error";
        'no-ex-assign': "error";
        'no-extra-boolean-cast': "error";
        'no-fallthrough': "error";
        'no-global-assign': "error";
        'no-invalid-regexp': "error";
        'no-irregular-whitespace': "error";
        'no-loss-of-precision': "error";
        'no-misleading-character-class': "error";
        'no-nonoctal-decimal-escape': "error";
        'no-prototype-builtins': "error";
        'no-regex-spaces': "error";
        'no-self-assign': ["error", {
            props: true;
        }];
        'no-shadow-restricted-names': ["error", {
            reportGlobalThis: true;
        }];
        'no-sparse-arrays': "error";
        'no-unassigned-vars': "error";
        'no-unexpected-multiline': "error";
        'no-unsafe-finally': "error";
        'no-unsafe-optional-chaining': "error";
        'no-unused-labels': "error";
        'no-unused-private-class-members': "error";
        'no-useless-assignment': "error";
        'no-useless-backreference': "error";
        'no-useless-catch': "error";
        'no-useless-escape': "error";
        'no-var': "error";
        'prefer-const': ["error", {
            destructuring: "any";
        }];
        'prefer-rest-params': "error";
        'prefer-spread': "error";
        'preserve-caught-error': "error";
        'require-yield': "error";
        'use-isnan': "error";
        'typescript/ban-ts-comment': ["error", {
            minimumDescriptionLength: number;
        }];
        'typescript/consistent-type-imports': ["error", {
            disallowTypeAnnotations: false;
            prefer: "type-imports";
        }];
        'typescript/no-array-constructor': "error";
        'typescript/no-duplicate-enum-values': "error";
        'typescript/no-dynamic-delete': "error";
        'typescript/no-empty-object-type': "error";
        'typescript/no-explicit-any': "error";
        'typescript/no-extra-non-null-assertion': "error";
        'typescript/no-extraneous-class': "error";
        'typescript/no-import-type-side-effects': "error";
        'typescript/no-invalid-void-type': "error";
        'typescript/no-misused-new': "error";
        'typescript/no-namespace': "error";
        'typescript/no-non-null-asserted-nullish-coalescing': "error";
        'typescript/no-non-null-asserted-optional-chain': "error";
        'typescript/no-require-imports': "error";
        'typescript/no-this-alias': "error";
        'typescript/no-unnecessary-type-constraint': "error";
        'typescript/no-unsafe-declaration-merging': "error";
        'typescript/no-unsafe-function-type': "error";
        'typescript/no-unused-expressions': "error";
        'typescript/no-unused-vars': ["error", {
            argsIgnorePattern: "^_";
            ignoreRestSiblings: true;
            varsIgnorePattern: "^_";
        }];
        'typescript/no-useless-constructor': "error";
        'typescript/no-wrapper-object-types': "error";
        'typescript/prefer-as-const': "error";
        'typescript/prefer-literal-enum-member': "error";
        'typescript/prefer-namespace-keyword': "error";
        'typescript/triple-slash-reference': "error";
        'typescript/unified-signatures': "error";
        'import/first': "error";
        'import/newline-after-import': ["error", {
            count: number;
        }];
        'import/no-duplicates': "error";
        'import/no-mutable-exports': "error";
        'import/no-named-default': "error";
        'unicorn/no-abusive-eslint-disable': "error";
        'nuxt/prefer-import-meta': "error";
        'vexel/require-disable-description': "error";
    };
    overrides: ({
        files: string[];
        rules: {
            'nuxt/no-page-meta-runtime-values': "error";
            'nuxt/no-nuxt-config-test-key'?: undefined;
            'nuxt/nuxt-config-keys-order'?: undefined;
        };
    } | {
        files: string[];
        rules: {
            'nuxt/no-nuxt-config-test-key': "error";
            'nuxt/nuxt-config-keys-order': "error";
            'nuxt/no-page-meta-runtime-values'?: undefined;
        };
    } | {
        files: string[];
        rules: {
            'vue/component-definition-name-casing': "warn";
            'vue/no-arrow-functions-in-watch': "error";
            'vue/no-async-in-computed-properties': "error";
            'vue/no-computed-properties-in-data': "error";
            'vue/no-deprecated-data-object-declaration': "error";
            'vue/no-deprecated-delete-set': "error";
            'vue/no-deprecated-destroyed-lifecycle': "error";
            'vue/no-deprecated-events-api': "error";
            'vue/no-deprecated-model-definition': "error";
            'vue/no-deprecated-props-default-this': "error";
            'vue/no-deprecated-vue-config-keycodes': "error";
            'vue/no-dupe-keys': "error";
            'vue/no-export-in-script-setup': "error";
            'vue/no-expose-after-await': "error";
            'vue/no-lifecycle-after-await': "error";
            'vue/no-multiple-slot-args': "warn";
            'vue/no-required-prop-with-default': "warn";
            'vue/no-reserved-keys': "error";
            'vue/no-reserved-props': "error";
            'vue/no-shared-component-data': "error";
            'vue/no-side-effects-in-computed-properties': "error";
            'vue/no-watch-after-await': "error";
            'vue/prefer-import-from-vue': "error";
            'vue/prop-name-casing': "warn";
            'vue/require-prop-type-constructor': "error";
            'vue/require-prop-types': "warn";
            'vue/require-render-return': "error";
            'vue/require-slots-as-functions': "error";
            'vue/return-in-computed-property': "error";
            'vue/return-in-emits-validator': "error";
            'vue/valid-define-emits': "error";
            'vue/valid-define-options': "error";
            'vue/valid-define-props': "error";
            'vue/valid-next-tick': "error";
        };
    })[];
};
