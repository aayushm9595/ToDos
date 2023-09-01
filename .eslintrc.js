module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    curly: 'off',
    // Add Prettier rules here
  },
  globals: {
    JSX: 'readonly',
    NodeJS: 'readonly',
  },
};