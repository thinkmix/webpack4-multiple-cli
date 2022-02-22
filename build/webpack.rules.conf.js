const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (config) {
    return [
        {
            test: /\.vue$/,
            use: 'vue-loader',
        },
        {
            test: /\.css$/,
            // 使用postcss不分离的写法
            // use: ["style-loader", "css-loader""postcss-loader"]
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"],
                publicPath: "/" // css中的基础路径
            })
        },
        {
            test: /\.s[ac]ss$/i,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                           
                        },
                    },
                ],
                publicPath: "/"
            })
        },
        {
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
            }, {
                loader: "eslint-loader",
            }],
            // 不检查node_modules下的js文件
            // exclude: "/node_modules/"
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                // 需要下载file-loader和url-loader
                loader: "url-loader",
                options: {
                    limit: 3 * 1024, //小于这个时将会已base64位图片打包处理
                    outputPath: "assets/img", // 图片文件输出的文件夹
                    publicPath: process.env.NODE_ENV === "development" ? "/assets/img" : `${config.build.assetsPublicPath}assets/img`
                }
            }]
        },
        {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
            }
        },
        {
            test: /\.html$/,
            // html中的img标签
            use: {
                loader: 'html-loader?config=raw-loader',
                options: {
                    attrs: ['img:src']
                }
            }
        }
    ];
};