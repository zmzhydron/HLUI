var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
function assetsPath(_path) {
  return path.posix.join('static', _path)
}
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    // publicPath: '/dist/',
    /* 
      发布的npm包被引用的名称，比如通过script标签引入的话，那么hlui就是入口文件(entry file)的返回值。
      相当于把打包输入的文件再加上了 export {default: index.js} 的道理
    */
    library: 'hlui',
    libraryTarget: 'umd', // 发布包的引用方式，umd为同时兼容nodejs,browser,import的形式
    /* 
      https://webpack.js.org/configuration/output/#outputumdnameddefine
      大概意思是可以把amd模块使用umd模式
    */
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        // include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.less?$/,
        loader: 'style-loader!css-loader!less-loader'
        // include: [resolve('node_modules')]
      },
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  // devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
      '@Comp': path.join(__dirname, './src/components'),
      '@src': path.join(__dirname, './src'),
      '@EXP': path.join(__dirname, './develop/exsample/'),
      ajax$: path.join(__dirname, './src/ajax.js')
    }
  },
  optimization: {
    //抽取公共的dm
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.join(__dirname, './src/ajax.js'),
      // to: `./fuck/aijiakesi.js`
    },
    {
      from: path.join(__dirname, './src/tools.js'),
    }
    ]),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true,
    //   hash: true
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    new webpack.ProvidePlugin({
      ajax: 'ajax',
      axios: 'axios',
      NODEENV: `NODEENV`,
      SchemValidator: 'async-validator/lib/index.js',
      ztools: '@src/tools.js',
      immutable: 'immutable'
    })
  ]
}