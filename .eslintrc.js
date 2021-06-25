module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'settings': {
    'react': {
      'version': 'latest',
    }
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'jest',
  ],
  'rules': {
    'indent': ['error', 2],
    'react/prop-types': 'off',
    'linebreak-style': 'off',
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-unused-vars': 'off',
  }
};