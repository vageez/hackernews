const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: {
      app: "./src/app.js"
},
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3030,
    hot: true,
  },
  output: {
    filename: "[name].bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
          publicPath: "./images",
        },
      },
    ],
  },
  resolve: {
    alias: {
      Reducer: path.resolve(__dirname, 'src/reducer.js'),
      Epics: path.resolve(__dirname, 'src/epics.js'),
      Const: path.resolve(__dirname, 'src/const.js'),
    }
  },  
  plugins: [
    // Hot reloading of webpack dev server
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    // 
    new htmlWebpackPlugin({
        title: 'Hackernews',
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'root',
        devServer: 'http://localhost:3030',
    })
  ],
};
