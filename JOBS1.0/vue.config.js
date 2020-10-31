
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7']
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          })
        ]
      }
    }
  },
  // 配置代理 http-proxy-middleware

  devServer : {
    proxy : {
      '/api': {
        target : 'http://10.20.159.106:3000',
        changeOrigin : true
      }
    }
  },
  runtimeCompiler : true  

};