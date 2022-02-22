module.exports = {
  source: {

  },
  build: {
    assetsPublicPath: '/',
    baseUrl: 'https://api.xxx.com', // 请求路径
  },
  dev: {
    port: 8094,
    proxy: {
      '/api/': {
        target: 'https://127.0.0.1',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api/',
        },
      },
    },
  },
};
