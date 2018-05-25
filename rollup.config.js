import flow from 'rollup-plugin-flow';
import {uglify} from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';

const env = process.env.ROLLUP_ENV;

const config = {
  input: 'src/index.js',
  output: {
    format: 'iife',
    name: 'DotModelLoader',
  },
  plugins: [
    flow({
      pretty: true,
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(uglify({}, minify));
}

export default config;
