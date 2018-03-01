module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/no-did-mount-set-state': 'off',
    'no-underscore-dangle': 'off',
    'react/no-did-update-set-state': 'off', // https://github.com/facebook/react/pull/12028
  },
};