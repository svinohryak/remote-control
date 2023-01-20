module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "false",
    "no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "warn",
  },
};
