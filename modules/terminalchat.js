const server = require('http').createServer((req, res) => res.end({}))
const io = require('socket.io')(server)

server.listen(420)

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

      socket.emit('chat', user, message)
    })
  })
}
