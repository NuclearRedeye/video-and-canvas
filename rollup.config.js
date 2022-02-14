import copy from 'rollup-plugin-copy';

export default {
  input: './out/debug/index.js',
  external: [ 'react', 'react-dom' ],
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
  plugins: [
    copy({
      targets: [{ src: './public/*', dest: './out/release' }]
    })
  ]
};
