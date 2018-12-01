const path = require('path');
const HWP = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')},
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        publicPath: 'dist/assets',
                        outputPath: 'assets',
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        compress: true,
        hot: true,
        port: 9000
    },
    plugins:[
        new HWP(
            {
               template: path.join(__dirname,'/public/index.html'),
               manifest: path.join(__dirname,'/public/manifest.json'),
               favicon: path.join(__dirname,'/public/favicon.ico')
            }
        ),
        new webpack.HotModuleReplacementPlugin()
    ]
}