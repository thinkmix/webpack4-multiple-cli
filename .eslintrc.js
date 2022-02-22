module.exports = {
  root: true,
  env: {
    browser: true,
    jquery: true,
  },
  // parser: "@babel/eslint-parser",
  parser: "babel-eslint",
  parserOptions: {
      // "ecmaVersion": 2020,
      "sourceType": 'module',
      // "ecmaFeatures": {
      //     "jsx": true,
      //     "modules": true,
      //     "experimentalObjectRestSpread": true
      // }
  },
  plugins: [ "html", "promise"],
  extends: [
    "standard"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "camelcase": 0,
    "no-extra-boolean-cast": 0,
    "space-before-function-paren": ["error", "never"],
    "semi": ["error", "always"],
    "comma-dangle": [2, "always-multiline"],
    "no-var": 0,
    "import/no-unresolved": 0,
    "no-underscore-dangle": [0],
    "prefer-template": 0,
    "object-shorthand": [0],
    "prefer-arrow-callback": 0,
    "prefer-rest-params": 0,
    "no-param-reassign": 0,
    "max-len": ["error", {
      "code": 200,
      "tabWidth": 2,
      "comments": 200,
      "ignoreComments": false,
      "ignoreTrailingComments": false,
      "ignoreUrls": true
    }],
    "global-require": 0,
    'no-restricted-syntax': [
      2,
      'LabeledStatement',
      'WithStatement',
    ],
    "space-before-function-paren": ["error", "always"],
  },
  "globals": {
    $: true,
    document: true,
  }
}
