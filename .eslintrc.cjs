/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // Base
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-console': 'error',
  },
  overrides: [
    // React / Next.js
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['jsx-a11y', 'react', 'react-hooks'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'next/core-web-vitals',
        'prettier',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        // TypeScriptにそぐわないルールの変更
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unNamedComponents: 'arrow-function',
          },
        ],
      },
    },
    // TypeScript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint/eslint-plugin', 'prefer-arrow'],
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'standard-with-typescript',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        // Reactにそぐわないルールの変更
        'no-nested-ternary': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/triple-slash-reference': [
          'error',
          {
            types: 'always',
          },
        ],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: true,
          },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowNullableObject: true,
          },
        ],
        // typeを強制
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        // named exportを強制
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        // arrow functionを強制
        'prefer-arrow/prefer-arrow-functions': [
          'error',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: true,
          },
        ],
        // import順序を強制
        'import/extensions': [
          'error',
          {
            ignorePackages: true,
            pattern: {
              js: 'never',
              jsx: 'never',
              ts: 'never',
              tsx: 'never',
            },
          },
        ],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            pathGroups: [
              {
                pattern: './*.{css,scss,sass,less}',
                group: 'index',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: {
              order: 'asc',
            },
          },
        ],
      },
    },
    // Next.js Router
    {
      files: ['src/{pages,app}/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // Storybook
    {
      files: ['*.{story,stories}.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
    // Vitest / Testing Library
    {
      files: ['**/*.{test,spec}.{ts,tsx}'],
      env: {
        jest: true,
      },
      plugins: ['vitest', 'testing-library'],
      extends: ['plugin:vitest/recommended', 'plugin:testing-library/react'],
    },
    // Public
    {
      files: ['public/**/*.js'],
      plugins: ['compat'],
      extends: ['plugin:compat/recommended'],
    },
  ],
};
