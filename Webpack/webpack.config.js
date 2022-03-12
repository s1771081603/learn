const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.scss$/, use: 'sass-loader' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './public/index.html' 
    }),
    new FileManagerWebpackPlugin({
      events: {
        onEnd: {
          delete: [ './portal.zip' ],
          archive: [{
            source: './dist',
            destination: `./portal.zip`
          }]
        }
      }
    })
  ],
  mode: 'production', // development  production 
}