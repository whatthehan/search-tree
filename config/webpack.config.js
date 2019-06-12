const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "../example/index.html"),
  filename: "index.html"
});

module.exports = {
  entry: path.resolve(__dirname, "../example/index.js"),
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "static/js/bundle.js",
    publicPath: "."
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    port: 3002
  }
};
