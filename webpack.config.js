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
    devtools: 'cheap-module-eval-source-map',
    entry: [
        path.join(__dirname, '/client/index.js')
    ],
    output: {
        path: path.join(__dirname, '/server'),
        publicPath: "/",
        filename: "bundle.js",
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css!'
            },
            {
                test: /\.(gif|png|jpe?g|svg|webp)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader'
                ]
            }
        ],
    },
    imageWebpackLoader: {
        mozjpeg: {
            quality: 65
        },
        pngquant:{
            quality: "65-90",
            speed: 4
        },
        svgo:{
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
    },
    resolve: {
        extensions: ['', '.js']
    }
};
