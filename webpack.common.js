const path = require("path");

module.exports = {
  entry: {
      app: "./src/app.js"
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
          options: {
            presets: ["@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime", "babel-plugin-styled-components"]
          }
        },
      }
    ],
  },
  resolve: {
    alias: {
      Reducer: path.resolve(__dirname, 'src/reducer.js'),
      Epics: path.resolve(__dirname, 'src/epics.js'),
      Const: path.resolve(__dirname, 'src/const.js'),
    }
  }
};
