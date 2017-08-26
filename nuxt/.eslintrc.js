module.exports = {
  root: true,
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: '2016',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  plugins: ['html', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        bracketSpacing: true
      }
    ],
    'no-console': 0
  },
  globals: {}
}
