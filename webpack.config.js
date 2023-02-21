const path = require('path');
// Plugins of CSS and SCSS/SASS
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Template HTML OF webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { SourceMapDevToolPlugin } = require('webpack');

// Settings of port
const port = process.env.PORT || 3000;
// Settings export of webpack
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/',
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
          // Rules for files JS/ JSX
            {
                enforce: 'pre',
                include: path.resolve(__dirname, '../src'),
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'eslint-webpack-plugin' },
                    { loader: 'source-map-loader' },
                ],
            },
            // Rules for files JS(JSX)
          // Rules of BABEL ES/JSX

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/env',
                        '@babel/react',
                    ],
                },
            },
            },
            // Rules for files CSS ,SASS AND SCSS
            {
                test: /(\.css|\.scss)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'sass-loader' },
                    { loader: 'css-loader' },
                ],
            },
            // Rules for files of imagens
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        // Template HTML
        new HtmlWebpackPlugin(
            {
                template: './public/index.html',
            },
        ),
        new MiniCssExtractPlugin(
            {
                filename: './css/index.scss',
            },
    ),
    new SourceMapDevToolPlugin(
            {
                filename: '[file].map',
            },
        ),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.sass', '.scss'],
        modules: [
            'node_modules',
        ],
        alias: {
            'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
        },
    },
};
