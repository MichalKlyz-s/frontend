module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: { parser: '@babel/eslint-parser' },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: { max: 5, allowFirstLine: true },
      },
    ],
  },
};
