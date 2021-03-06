var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'index' : './pages/index/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../server/public/'),
        filename: '[name]/index.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        scss: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader', fallback: 'vue-style-loader' }),
                        sass: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader?indentedSyntax', fallback: 'vue-style-loader' }),
                        css: ExtractTextPlugin.extract({ use: 'css-loader', fallback: 'vue-style-loader' })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: 'imgs/[name].[ext]',
                    publicPath: 'res/'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ use: 'css-loader' })
            }
        ]
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.common.js',
          'Material' : path.resolve(__dirname, './material'),
          'Components' : path.resolve(__dirname, './components'),
          'Directives' : path.resolve(__dirname, './directives'),
          'Services' : path.resolve(__dirname, './services'),
          'General' : path.resolve(__dirname, './general'),
          'Common' : path.resolve(__dirname, '../common')
        }
    },
    performance: {
        hints: false
    },
    devtool: 'eval-source-map',
    plugins: [
        new ExtractTextPlugin({ filename: '[name]/index.css', disable: false, allChunks: true })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'nosources-source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            comments : false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}