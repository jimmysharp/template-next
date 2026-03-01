/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  rules: {
    // 'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    // 現状コードがサンプルのためコメントアウト
    'selector-class-pattern': null,
  },
};

export default config;
