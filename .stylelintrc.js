/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
  overrides: [
    {
      // 非トランスパイル対象CSS
      files: ['public/**/*.css'],
      plugins: ['stylelint-no-unsupported-browser-features'],
      'plugin/no-unsupported-browser-features': [
        true,
        {
          severity: 'warning',
        },
      ],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};

export default config;
