import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginImport from 'eslint-plugin-import'
import airnb from 'eslint-config-airbnb'

export default tseslint.config(
    { ignores: ['/.git', 'node_modules', './github', 'dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            eslintPluginReact.recommended,
            airnb.recommended,
            eslintPluginImport.recommended,
            eslintSimpleImportSort.recommended,
            eslintPluginPrettier.recommended,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: eslintPluginReact,
            import: eslintPluginImport,
            airnb: airnb,
            'simple-import-sort': eslintSimpleImportSort,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal'],
                    pathGroups: [
                        {
                            pattern: '**/styled.ts',
                            group: 'unknown',
                            position: 'after',
                        },
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
)
