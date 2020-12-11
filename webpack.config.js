const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ['./src/app.js', './sass/styles.sass'],
  resolve: {
    modules: [
      path.resolve(__dirname, "assets"),
      "node_modules"
    ],
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  module: {
    rules: [      
      { test: /\.(png|svg|jpg|gif)$/, use: [ 'file-loader' ] }, 
      {
        test: /\.sass$/,
		use: [
          {
		    loader: 'file-loader',
			options: {
			  name: 'css/[name].css',
			}
          },
		  {
		    loader: 'extract-loader'
          },
		  {
		    loader: 'css-loader?-url'
          },
		  {
		    loader: 'postcss-loader'
          },
		  {
		    loader: 'sass-loader'
          }
		]
      },                 
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'COVID-19',
        template: './static/index.html'
      }),
    new CopyPlugin({
      patterns: [        
        { from: "assets", to: "assets" },
      ],
    }),
  ]
}
