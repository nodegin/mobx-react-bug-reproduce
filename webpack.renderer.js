const merge = require('webpack-merge')

module.exports = function(config) {
  config = merge.smart(config, {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: /node_modules/,
          use: ['thread-loader', 'react-hot-loader/webpack', 'eslint-loader']
        }
      ]
    }
  })

  return config
}
