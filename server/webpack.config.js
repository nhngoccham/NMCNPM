const path = require('path')
const pkg = require('./package.json')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'index.min.js'
    },
    externals: [nodeExternals({ modulesFromFile: true })],
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ]
    }
}
