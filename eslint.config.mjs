import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import _import from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  plugins: [prettier, _import, jsxA11y],
})

/** @type {import('eslint').Linter.Config[]} */
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: ['**/node_modules', '**/.next', '**/build'],
  },
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },
  { plugins: { 'react-hook': pluginReactHooks } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends(
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended'
  ),
  {
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': [
        2,
        {
          caseSensitive: false,
        },
      ],

      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      // indent: ['error', 2],
      'linebreak-style': [0, 'windows'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
    },
  },
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'components', 'pages', 'public', 'style'],
        },
        react: {
          version: 'detect',
        },
      },
    },
  },
]
