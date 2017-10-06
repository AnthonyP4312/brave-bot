
const exec = require('child_process').execSync

module.exports = (bot) => {
  bot.on('message', async (user, userID, channelID, message, event) => {
    if (message.startsWith('$louder')) {
      let sound = message.replace('$louder', '').trim()
      exec(`sox ${sound}.ogg ${sound}.ogg gain -n -3`, (err, stdout, stderr) => {
        if (err) {
          bot.sendMessage({
            to: userID,
            message: 'the shits fucked: ' + err
          })
        }

        bot.sendMessage({
          to: userID,
          message: 'its louder'
        })
      })
    }

    if (message.startsWith('$quieter')) {
      let sound = message.replace('$quieter', '').trim()
      exec(`sox ${sound}.ogg ${sound}.ogg gain -n 3`, (err, stdout, stderr) => {
        if (err) {
          bot.sendMessage({
            to: userID,
            message: 'the shits fucked: ' + err
          })
        }

        bot.sendMessage({
          to: userID,
          message: 'its louder'
        })
      })
    }
  })
}
