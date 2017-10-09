const server = require('http').createServer().listen(420) // eslint-disable-line no-unused-vars
const io = require('socket.io')(420, {
  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

module.exports = (bot) => {
  io.on('connection', socket => {
    console.log('tanners connected')

    // incoming messages from me
    socket.on('chat', data => {
      bot.sendMessage({
        to: '272692254249058304',
        message: data
      })
    })

    // outgoing messages to me
    bot.on('message', async (user, userID, channelID, message, event) => {
      if (bot.id === userID) return

      socket.emit('chat', message)
    })
  })
}
