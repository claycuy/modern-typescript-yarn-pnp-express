const typescript = require('@rollup/plugin-typescript');
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'module'
  },
  plugins: [typescript()]
};