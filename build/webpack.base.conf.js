const path = require('path');
const webpack = require("webpack");
const glob = require("glob");
const config = require('../config');
const utils = require('./utils');

//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// 分离css
const extractTextPlugin = require("extract-text-webpack-plugin");
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
//获取当前环境的编译规则
const setRules = require("./webpack.rules.conf.js");
const rules = setRules(config);
//vue-loader-plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/${name}.html`,
    filename: `${name}.html`,
    inject: true,
    hash: false, //开启hash  ?[hash]
    chunks: chunks,
    minify: {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, //去除属性引用
      minifyCSS: true,
    },
  };
};

function getEntry () {
  var entry = {},
    action = function (name) {
      var start = name.indexOf('src/') + 4,
        end = name.length - 3;//.js切割

      entry[name.slice(start, end)] = name;
    };

  //读取所有page入口
  glob.sync(`./src/pages/**/*.js`)
    .forEach(action);

  return entry;
};
function getEntryHtml () {
  var entry = [], temp = [];

  //读取当前系统目录所有page入口
  temp = glob.sync(path.join(`./src/pages/**/*.html`));
  entry.push(...temp);

  return entry;
};

exports.webpackConfbase = {
  entry: getEntry(),
  module: {
    rules: [...rules]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
  externals: {
    // 'jquery': 'jQuery',
    // 'vue': 'Vue'
  },
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        // vendor: { // 抽离第三方插件
        //   test: /node_modules/, // 指定是node_modules下的第三方包
        //   chunks: 'initial',
        //   name: 'vendor', // 打包后的文件名，任意命名    
        //   // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        //   priority: 10
        // },
        utils: { // 抽离自己写的公共代码
          chunks: 'initial',
          name: 'common', // 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 20
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    // 全局暴露统一入口
    new webpack.ProvidePlugin({

    }),
    // new webpack.DefinePlugin({
      
    // }),
    // 消除冗余的css代码
    new purifyCssWebpack({
      paths: getEntryHtml()
    }),
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin({
      filename: 'assets/css/[name].[hash:8].min.css',
    }),
  ],
}
//配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: ['vendor', 'common', element]
  })
})

//自动生成html模板
htmlArray.forEach((element) => {
  exports.webpackConfbase.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})