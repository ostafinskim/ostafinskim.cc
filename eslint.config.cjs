module.exports = {
  // Example configuration
  ignores: ['dist/**', 'node_modules/**'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
  },
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      process: 'readonly',
    },
  },

};