module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "eslint:recommended", "plugin:react/recommended", "next", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
}
