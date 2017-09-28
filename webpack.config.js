const path = require('path');
const webpack = require('webpack');

module.exports= {
  devServer: {
      inline: true,
      contentBase: './server',
      port: 3000
  },
  devtools: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, '/client/index.js')
  ],
  output: {
      path: path.join(__dirname, '/server'),
      filename: "bundle.js",
  },
  plugins:[
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: [ 'react-hot', 'babel' ]
      },
      {
          test: /\.scss/,
          loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ]
  }
};
