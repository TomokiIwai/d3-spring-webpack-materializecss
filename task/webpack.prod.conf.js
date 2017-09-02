//
// Webpackリリース環境用設定ファイル
//
let _ = require('lodash');
let webpack = require('webpack');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

let base = require('./webpack.base.conf');

module.exports = _.merge({}, {
  plugins: [
    // いろいろなところで不都合が生じるので設定を忘れないように注意
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    /**
     * CSSのを圧縮
     */
    new OptimizeCSSPlugin(),
    /**
     * javascriptコードを圧縮
     */
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: false})
  ]
}, base);
