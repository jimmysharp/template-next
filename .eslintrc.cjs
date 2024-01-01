module.exports = {
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  root: true,
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'jsx-a11y',
    'react',
    'react-hooks',
    'prefer-arrow',
    'vitest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'standard-with-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: '.',
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    // reactにそぐわないルールの変更
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
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // typescriptにそぐわないルールの変更
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
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
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unNamedComponents: 'arrow-function',
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
          'object',
          'index',
        ],
        pathGroups: [
          {
            pattern: '{react,react-dom/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{[A-Z]*,**/[A-Z]*}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**.module.css',
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
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    // next.js routerの設定
    {
      files: ['src/pages/**/*.tsx', 'src/app/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // storybookの設定
    {
      files: ['*.stories.tsx', '*.stories.ts'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
    // テストの設定
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      extends: ['plugin:vitest/recommended'],
    },
  ],
};
