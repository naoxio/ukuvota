// This is the webpack config used for unit tests.

var cssUtils = require('./css-utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var config = require('../config')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: cssUtils.styleRules({
      sourceMap: config.dev.cssSourceMap,
      postcss: true
    })
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
