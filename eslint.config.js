const nx = require('@nx/eslint-plugin')
const vue = require('eslint-plugin-vue')
const prettier = require('eslint-plugin-prettier/recommended')
const globals = require('globals')

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/.nx', '**/.vite-ssg-temp'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ENV: 'readonly',
      },
    },
    rules: {
      'max-len': ['error', { code: 160 }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  prettier,
]
