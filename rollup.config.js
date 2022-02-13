export default {
  input: './out/debug/ts/index.js',
  output: {
    file: './out/release/index.js',
    format: 'es',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: [ 'react', 'react-dom' ],
};
