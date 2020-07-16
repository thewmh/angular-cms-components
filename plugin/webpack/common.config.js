const path = require('path');
const pluginRoot = path.join(__dirname, '../');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(pluginRoot, 'src', 'index.ts'),
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    path: path.join(pluginRoot, 'dist'),
    filename: 'plugin.min.js',
  },
  plugins: [
    // cleans dist folder before each new webpack build
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript',
                ['@babel/env', { useBuiltIns: 'entry', corejs: 2 }],
              ],
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
              ],
            },
          },
        ],
      },
    ],
  },
};
