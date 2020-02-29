module.exports = {
  entry: {
    main: "./resources/js/app.js"
  },
  output: {
    path: __dirname + "/public/js",
    publicPath: "/",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};
