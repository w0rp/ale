module.exports = {
  root: true,
  extends: ['prettier', 'airbnb', 'eslint:recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
};
