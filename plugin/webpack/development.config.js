const merge = require('webpack-merge');
const common = require('./common.config');
const path = require('path');
const pluginRoot = path.join(__dirname);

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(pluginRoot, 'dist'),
  },
});
