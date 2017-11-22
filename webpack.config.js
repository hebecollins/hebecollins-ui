const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './server',
        port: 3000,
        historyApiFallback: {
            disableDotRule: true,
        }
    },
    // devtool: 'cheap-module-eval-source-map',
    entry: [
        path.join(__dirname, '/app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/server'),
        publicPath: "/",
        filename: "bundle.js",
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'app'),
                    path.join(__dirname, 'config'),
                    path.join(__dirname, 'mode.js'),
                ],
                loaders: ['react-hot-loader', 'babel-loader']
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg|webp)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?' + JSON.stringify(
                        {
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant: {
                                quality: "65-90",
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            },
                            // Specifying webp here will create a WEBP version of your JPG/PNG images
                            webp: {
                                quality: 75
                            }
                        }
                    )
                ]
            },
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader"},
        ],
    },
    resolve: {
        extensions: ['.js']
    }
};
