import Server from './server'

(() => {
  const server = Server.getInstance()
  server.start()
})()