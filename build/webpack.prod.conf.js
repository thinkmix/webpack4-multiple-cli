const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require('../config')
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const Confbase = require('./webpack.base.conf');
const CompressionWebpackPlugin = require('compression-webpack-plugin')//GZIP
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//分析包
const optimist = require('optimist');
const ora = require('ora')
require('shelljs/global')

const webpackConfProd = {
	stats: "minimal",
	mode: 'production', // 通过 mode 声明生产环境
	output: {
		path: path.resolve(__dirname, `../dist/`),
		// 打包多出口文件
		filename: 'assets/js/[name].[hash].js',
		publicPath: `${config.build.assetsPublicPath}`
	},
	devtool: false,
	plugins: [
		//删除dist目录
		new cleanWebpackPlugin(['../dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			verbose: true, //开启在控制台输出信息
			dry: false,
		}),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					dead_code: true,
					drop_console: true
				}
			}
		}),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css)$/,
			threshold: 10240,
			minRatio: 0.8
		}),
	]
}

const { argv } = optimist;
if (argv.report) { // 开启包分析工具
	webpackConfProd.plugins.push(new BundleAnalyzerPlugin())
}

const webpackConfig = merge(Confbase.webpackConfbase, webpackConfProd);

const spinner = new ora();
spinner.color = 'green';
spinner.text = `开始编译...`;
spinner.start();

webpack(webpackConfig, function () {
	spinner.stop();
})

module.exports = webpackConfig