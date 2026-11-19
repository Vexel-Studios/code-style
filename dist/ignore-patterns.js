/** Folders of agent and editor tools, which hold their own scripts and settings. */
export const toolFolders = ['.claude/**', '.trae/**'];
/** Build output and caches, which no linter or formatter should read. */
export const generatedFolders = [
    '**/.data/**',
    '**/.nuxt/**',
    '**/.output/**',
    '**/.turbo/**',
    '**/.wrangler/**',
    '**/coverage/**',
    '**/dist/**',
    '**/node_modules/**'
];
