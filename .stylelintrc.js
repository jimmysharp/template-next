/** @type {import('stylelint').Config} */
const config = {
  plugins: ['stylelint-no-unsupported-browser-features'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        browsers: ['> 0.5%', 'not dead'],
        ignore: ['css-nesting'],
        ignorePartialSupport: true,
      },
    ],
    // レガシーブラウザ対応
    'media-feature-range-notation': 'prefix',
  },
};

export default config;
