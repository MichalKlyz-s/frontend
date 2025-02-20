module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    "no-multiple-empty-lines": ["off"],
    "indent": ["off"],
    'vue/multi-word-component-names': 'off', // Wyłącza regułę
    'vue/no-v-for-template-key-on-child': 'off', // Wyłącza regułę dla `v-for`
    // 'semi': 0,
  }
}


// npx eslint --fix .   hmmm moze

