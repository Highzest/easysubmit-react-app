module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'react/prop-types': 1,
    semi: 0,
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    quotes: [2, 'single'],
  },
}
