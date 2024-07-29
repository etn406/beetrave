import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
// import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  // prettier,
  // ...svelte.configs['flat/prettier'],
  {
    files: ['**/*.js', '**/*.ts', '**/*.svelte'],

    plugins: {
      '@stylistic': stylistic
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: ts.parser
      }
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/']
  }
];
