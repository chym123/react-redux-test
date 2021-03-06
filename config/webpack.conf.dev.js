const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: {
        entry: [
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, '../src/index.jsx')
        ]
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'img/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'i/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, '../dist/dll', 'dll-manifest.json'))
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dll/vendors.dll.js'],
            append: false,
            publicPath: '',
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ]
};