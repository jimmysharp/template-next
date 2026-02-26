import { defineConfig } from 'oxlint';

const config = defineConfig({
  plugins: [
    'oxc',
    'eslint',
    'typescript',
    'unicorn',
    'import',
    'react',
    'nextjs',
    'jsx-a11y',
    'vitest',
  ],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    perf: 'error',
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
  },
  rules: {
    // restriction rules
    'no-console': 'error',
    'no-var': 'error',
    'typescript/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    'typescript/explicit-module-boundary-types': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-import-type-side-effects': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/prefer-readonly': 'error',
    'import/no-default-export': 'error',
    // style rules
    'no-duplicate-imports': 'error',
    'typescript/consistent-type-assertions': 'error',
    'typescript/consistent-type-definitions': ['error', 'type'],
    'typescript/consistent-type-imports': 'error',
    'import/no-anonymous-default-export': 'error',
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        allowNamespace: true,
      },
    ],
    'react/self-closing-comp': 'error',
    'vitest/consistent-vitest-vi': 'error',
    'vitest/no-importing-vitest-globals': 'error',
    // pedantic rules
    eqeqeq: ['error', 'smart'],
    'typescript/no-deprecated': 'error',
    'typescript/prefer-ts-expect-error': 'error',
    // Reactにそぐわないルールの変更
    'no-undefined': 'off',
    'import/no-unassigned-import': 'off',
    'typescript/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'typescript/triple-slash-reference': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    // Next.js Router
    {
      files: ['src/{pages,app}/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // Tests
    {
      files: ['*.{spec,test}.{ts,tsx}'],
      rules: {
        'no-await-in-loop': 'off',
        'typescript/no-unsafe-type-assertion': 'off',
      },
    },
    // Storybook
    {
      files: ['**/*.{story,stories}.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-anonymous-default-export': 'off',
        'typescript/consistent-type-assertions': 'off',
        'typescript/consistent-type-definitions': 'off',
        'react/rules-of-hooks': 'off',
      },
    },
    {
      files: ['.storybook/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // Type definition
    {
      files: ['*.d.ts'],
      rules: {
        'typescript/consistent-type-assertions': 'off',
        'typescript/consistent-type-definitions': 'off',
      },
    },
    // Config files
    {
      files: ['*.config.{js,ts}', '*rc.js'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-named-as-default-member': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    '.pnpm-store/',
    '.next/',
    'next-env.d.ts',
    'coverage/',
    'storybook-static/',
  ],
});

export default config;
