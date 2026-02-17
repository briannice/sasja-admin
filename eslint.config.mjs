import coreWebVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...coreWebVitals,
  prettier,
  {
    rules: {
      'react/display-name': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['tailwind.config.js'],
  },
]

export default config
