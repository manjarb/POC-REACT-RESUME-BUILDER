import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'semi': ['error', 'always'], // Enforce semicolons
      'indent': ['error', 2], // Enforce 2-space indentation
      'quotes': ['error', 'single'], // Enforce single quotes
      'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas in multiline objects/arrays
      'eol-last': ['error', 'always'], // Enforce newline at the end of files
      'object-curly-spacing': ['error', 'always'], // Enforce spacing inside curly braces
      "react-hooks/exhaustive-deps": "warn",
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Group 1: Built-in and external modules
            ['^\\u0000', '^@?\\w'],

            // Group 2: Internal imports
            ['^(@|components|utils|config|vendored-lib)(/.*|$)'],

            // Group 3: Parent imports (like ../)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // Group 4: Sibling imports (like ./)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // Group 5: Style imports
            ['^.+\\.s?css$']
          ]
        }
      ],
    },
  },
)
