module.exports = {
  presets: [
    '@babel/preset-env',
    ['@vue/app',
  {
    useBuiltIns: 'entry',
    exclude: ['transform-regenerator', 'transform-async-to-generator'],
  },
],
  ],
  plugins: [
    'transform-async-to-promises',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining'
  ],
};
