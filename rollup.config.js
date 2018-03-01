import babel from 'rollup-plugin-babel';

const config = {
  input: 'src/index.js',
  plugins: [],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
};

config.plugins.push(babel({}));

export default config;
