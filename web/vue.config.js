const SERVER = require('./src/config/server.config')
module.exports = {
  devServer: {
    host: SERVER.host,
    port: SERVER.port,
    proxy: {
      '/': {
        target: SERVER.api_server_url,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
