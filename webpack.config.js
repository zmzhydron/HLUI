var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
function assetsPath(_path){
  return path.posix.join('static', _path)
}
module.exports = {
  entry: [
    './develop/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
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
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "develop"),
    compress: true,
    historyApiFallback: {
      index: "/index.html"
    },
    port: 9000,
    proxy: {
    '/api': {
        target: `http://localhost:9991`
      } 
    },
  },
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
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      ajax: 'ajax',
      axios: 'axios',
      NODEENV: `NODEENV`,
      SchemValidator: 'async-validator/lib/index.js',
      ztools: '@src/tools.js',
      immutable: 'immutable'
    })
  ]
}