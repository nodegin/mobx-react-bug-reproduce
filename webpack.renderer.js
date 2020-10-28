const merge = require("webpack-merge");

module.exports = function (config) {
  config = merge.smart(config, {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: /node_modules/,
          use: ["thread-loader", "react-hot-loader/webpack", "eslint-loader"],
        },
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"],
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },

    //https://github.com/mobxjs/mobx-react-lite/issues/248
    externals: ["react", "react-dom"],
  });

  return config;
};
