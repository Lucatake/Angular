const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8000',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' },
    useWSL: true,
  }
];


module.exports = PROXY_CONFIG;

