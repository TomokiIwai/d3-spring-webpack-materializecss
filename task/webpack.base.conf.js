let ExtractTextPlugin = require('extract-text-webpack-plugin');
let config = require('./config');

const extractSass = new ExtractTextPlugin({filename: "../css/d3.css"});

module.exports = {
  /**
   * ブラウザライクな環境用にビルドすることを明示
   */
  target: 'web',
  /**
   * ビルドの基点ファイル設定
   */
  entry: {
    'd3': config.srcPath + '/d3.js'
  },
  /**
   * 出力先の設定
   */
  output: {
    path: config.distPath,
    filename: '[name].js',
    publicPath: '/js/'
  },
  plugins: [
    extractSass,
  ],
  /**
   * require構文で解決する条件の設定
   */
  resolve: {
    // 拡張子
    extensions: ['.js', '.json'],
    // エイリアス
    alias: {
      '@': config.srcPath
    }
  },
  /**
   * ビルド時に適用するローダーの設定
   */
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {loader: 'expose-loader', options: 'jQuery'},
          {loader: 'expose-loader', options: '$'}
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ["css-loader", "sass-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.woff(2)?$/,
        loader: 'file-loader'
      }
    ]
  }
};
