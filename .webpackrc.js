const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    // 'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  extraBabelIncludes:['/node_modules/query-string', '/node_modules/axios'],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      proxy: {
        "/ninja/api": {
          target: "http://localhost:8088/",
          changeOrigin: true
        }
      }
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
