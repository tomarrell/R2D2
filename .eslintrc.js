module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/no-did-mount-set-state': 'off',
    'no-underscore-dangle': 'off',
    'react/no-did-update-set-state': 'off', // https://github.com/facebook/react/pull/12028
    'no-unused-expressions': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
