module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      generators: false,
      legacyDecorators: true,
      objectLiteralDuplicateProperties: false,
    },
  },
  extends: ['prettier', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
  },
};
