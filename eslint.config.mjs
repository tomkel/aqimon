import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

// /** @type {import('eslint').Linter.Config[]} */
export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
  }
  },
  {
    files: ["**/*.svelte"],

    languageOptions: {
    parserOptions: {
      parser: ts.parser,
        extraFileExtensions: ['svelte'],
    }
  }
  },
  {
    ignores: ["build/", ".svelte-kit/", "dist/"]
  }
)
