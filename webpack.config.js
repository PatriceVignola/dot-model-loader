/**
 * @format
 * @flow
 */

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libraryName = 'Wwdc2010ModelLoader';
const distName = 'wwdc2010-model-loader';
const distPath = `${__dirname}/dist`;
const entry = `${__dirname}/src/index.js`;

const rules = [
  {
    loader: 'babel-loader',
    include: [path.resolve(__dirname, 'src')],
    test: /\.js$/,
    query: {
      plugins: ['transform-runtime'],
    },
  },
];

const dev = {
  entry,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  output: {
    path: distPath,
    filename: `${distName}.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
  },
  module: {rules},
  mode: 'development',
};

const release = {
  entry,
  output: {
    path: distPath,
    filename: `${distName}.min.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
  },
  module: {rules},
  mode: 'production',
};

module.exports = [dev, release];
