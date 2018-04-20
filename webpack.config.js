const webpack = require('webpack');
const path = require('path');
const WebpackStrip = require('strip-loader');

module.exports = {
    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    context: __dirname,
    devtool: 'source-map',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
        filename: 'index.js'
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
        mobx: 'mobx',
    }
};
