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
    files: ['**/*.js', '**/*.ts'],

    plugins: {
      '@stylistic': stylistic
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: ts.parser,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/']
  }
];
