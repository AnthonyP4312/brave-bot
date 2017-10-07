const cmd = require('node-cmd')
const exec = require('child_process').execSync

module.exports = (bot) => {
  bot.on('message', async (user, userID, channelID, message, event) => {
    if (message.startsWith('$louder')) {
      let sound = message.replace('$louder', '').trim()
      cmd.get(`sox -v 1.4 /home/pi/node/brave-bot/soundFiles/${sound}.ogg /home/pi/node/brave-bot/soundFiles/${sound}2.ogg`, () => {
        cmd.get(`rm -f /home/pi/node/brave-bot/soundFiles/${sound}.ogg`, () => {
          cmd.get(`mv /home/pi/node/brave-bot/soundFiles/${sound}2.ogg /home/pi/node/brave-bot/soundFiles/${sound}.ogg`, () => {
            bot.sendMessage({
              to: userID,
              message: `${sound} done`
            })
          })
        })
      })
    }

    if (message.startsWith('$quieter')) {
      let sound = message.replace('$quieter', '').trim()
      cmd.get(`sox -v 0.6 /home/pi/node/brave-bot/soundFiles/${sound}.ogg /home/pi/node/brave-bot/soundFiles/${sound}2.ogg`, () => {
        cmd.get(`rm -f /home/pi/node/brave-bot/soundFiles/${sound}.ogg`, () => {
          cmd.get(`mv /home/pi/node/brave-bot/soundFiles/${sound}2.ogg /home/pi/node/brave-bot/soundFiles/${sound}.ogg`, () => {
            bot.sendMessage({
              to: userID,
              message: `${sound} done`
            })
          })
        })
      })
    }
  })
}
