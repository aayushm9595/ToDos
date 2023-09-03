module.exports = {
  root: true,
  extends: ["@react-native-community"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    curly: "off",
    quotes: ["error", "double"],
    // Add Prettier rules here
  },
  env: {
    node: true,
    es6: true,
    jest: true, // Add this line for Jest
    "react-native/react-native": true, // Add this line for React Native
  },
  globals: {
    JSX: "readonly",
    NodeJS: "readonly",
  },
};
