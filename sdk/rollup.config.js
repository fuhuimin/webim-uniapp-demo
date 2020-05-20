import commonjs from 'rollup-plugin-commonjs';
export default {
  input: './src/connection.js',
  output: {
    file: 'bundle.js',
    format: 'umd',
    name: 'WebIM'
  },
  plugins: [
    commonjs()
  ]
};