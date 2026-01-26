module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended", // Vue 2 recommended rules
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  plugins: ["vue", "prettier"],
  parserOptions: {
    ecmaVersion: 2020, // Supports ES2020 syntax
    sourceType: "module"
  },
  rules: {
    quotes: "off",
    "prettier/prettier": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    "no-unused-vars": ["warn"],
    "no-undef": "off",

    // Vue rules you want to disable or adjust
    "vue/multi-word-component-names": "off",
    "vue/no-v-for-template-key-on-child": "off",
    "space-before-function-paren": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",

    // Code style rules
    // quotes: ["error", "double"], // Enforce double quotes
    semi: ["error", "always"], // Require semicolons
    "comma-dangle": ["error", "only-multiline"],

    // Enforce space before function parentheses (important)
    // "space-before-function-paren": ["error", "always"],

    // Indentation: Use 2 spaces, compatible with Prettier (which also uses 2 spaces by default)
    indent: ["error", 2, { SwitchCase: 1 }],

    // Disallow multiple empty lines (better to enable this)
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

    // Prettier integration: show prettier errors as ESLint errors
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto" // Helps avoid issues with line endings across OSes
      }
    ],

    // Vue attribute formatting
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
};
