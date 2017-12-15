var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    StylelintBarePlugin = require('stylelint-bare-webpack-plugin'),
    lintFormatter = require('lint-formatter');

var sassOptions = {
    outputStyle: 'compressed',
    includePaths: [
        path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets')
    ]
};

module.exports = {
    entry : {
        app: [
            path.join(__dirname, '/app/js/app.js'),
            path.join(__dirname, '/app/scss/app.scss')
        ]
    },
    output: {
        path: path.join(__dirname, '/build/'),
        filename: '[name].js'
    },
    resolve: {
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'raw-loader'
                    }, {
                        loader: 'postcss-loader',
                    }, {
                        loader: 'sass-loader',
                        options: sassOptions
                    }]
                })
            },
            {
                test: /\.woff2?(\?.+)?$|\.ttf(\?.+)?$|\.eot(\?.+)?$|\.svg(\?.+)?$|\.jpe?g$|\.png$|\.gif$/,
                loader: 'file'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {
                                loose: true,
                                modules: false
                            }]
                        ],
                        cacheDirectory: true,
                        babelrc: false
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules|bower_components/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        formatter: lintFormatter.eslint
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: [
                            'last 4 version',
                            'ie >= 9',
                            'ios 8'
                        ]
                    })
                ]
            }
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new StylelintBarePlugin({
            files: 'app/scss/**/*.s?(c|a)ss',
            formatter: lintFormatter.stylelint
        })
    ]
};
