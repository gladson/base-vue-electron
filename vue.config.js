const webpack = require('webpack')

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: true,

    devServer: {
        proxy: {
            '^/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            }
        },
        open: process.platform === "darwin",
        //host: "127.0.0.1",
        port: 8181,
        https: false,
        hotOnly: false,
        compress: true,
        overlay: {
            warnings: true,
            errors: true
        },
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    },

    parallel: require("os").cpus().length > 2,
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery',
          jQuery: 'jquery'
        })
      ]
    }
}