const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v0/b/mr-defence-d9934.appspot.com/o',
    createProxyMiddleware({
      target: 'https://firebasestorage.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/v0/b/mr-defence-d9934.appspot.com/o': '/o',
      },
    })
  );
};
