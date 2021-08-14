module.exports = {
  extends: [
    "next/core-web-vitals",

    // React
    "plugin:react/recommended",

    // Prettier
    // recommended rules
    "plugin:prettier/recommended"
  ],
  globals: {
    React: 'readonly'
  }
}
