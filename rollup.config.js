export default {
  input: './out/debug/ts/index.js',
  output: [
    {
      file: './out/release/index.iife.js',
      format: 'iife',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
    {
      file: './out/release/index.esm.js',
      format: 'es',
    },
  ],
  external: [ 'react', 'react-dom' ],
};
