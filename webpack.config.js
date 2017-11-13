const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcDir = path.resolve('sass');
const dstDir = path.resolve('css');

var entries = {};
glob.sync(srcDir + '/*.scss').map(function (file) {
    entries[path.basename(file, path.extname(file))] = file
});

module.exports = {
    entry: entries,
    output: {
        path: dstDir,
        filename: '[name].css'
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {url: false}
                        },
                        {
                            loader: 'sass-loader',
                            options: {url: false}
                        }
                    ]
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};
