import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'

// /** @type {import('eslint').Linter.Config[]} */
export default ts.config(
  { name: 'js/recommended', ...js.configs.recommended },
  ...ts.configs.recommendedTypeChecked,
  ...svelte.configs['flat/recommended'],
  {
    name: 'ts/setup',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['svelte'],
      },
    },
  },
  {
    name: 'svelte/setup',
    files: ['**/*.svelte'],

    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    name: 'ignores',
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  },
)
