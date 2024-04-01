module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  plugins: ['react-hooks', 'react', 'react-native', 'import'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 0,
    'react/prop-types': [
      'error',
      {
        ignore: [
          'children',
          'route'
        ]
      }
    ],
    'no-console': 'off',
    semi: [2, 'always'],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'react/jsx-handler-names': 1
  },
  settings: {
    'import/ignore': ['react-native']
  }
};
