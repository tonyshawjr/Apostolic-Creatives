const webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000', // Proxy to backend
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
    ],
  },
};
