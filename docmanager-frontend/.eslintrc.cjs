/**
 * Minimal legacy ESLint config so IDEs detect ESLint.
 * The real, project config is the flat config in `eslint.config.js`.
 * Keeping this file minimal avoids overriding the flat config.
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended", // základné ESLint pravidlá
    "plugin:prettier/recommended", // integrácia s Prettier
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
