const webpack = require('webpack');
const path = require('path');
const WebpackStrip = require('strip-loader');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: false
    },

    plugins: [
        new MergeIntoSingleFilePlugin({
            'index.js': [
                path.resolve(__dirname, 'src/Validation.js'),
                path.resolve(__dirname, 'src/FormStore.js'),
                path.resolve(__dirname, 'src/index.js')
            ]
        })
    ],
    context: __dirname,
    devtool: 'source-map',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]'
    },

    module: {
        rules: [
            {
                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
                use: [
                    {loader: 'babel-loader'},
                    {loader: WebpackStrip.loader('logger.debug', 'logger.info', 'console.log')}
                ],
                exclude: /node_modules/,
                // Skip any files outside of your project's `src` directory
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    externals: {
        mobx: 'mobx'
    }
};
