const _ = require('lodash')
const ball = require('../dataSets/eightBall')

module.exports = (bot) => {
  bot.on('message', function (user, userID, channelID, message, event) {
    if (message.startsWith('!roll')) {
      bot.sendMessage({
        to: channelID,
        message: doRoll(message)
      })
    }

    if (message === 'ping') {
      console.log(user)
      console.log(JSON.stringify(event, null, 2))

      console.log(bot.getVoiceChannel(event))
      bot.sendMessage({
        to: channelID,
        message: `<:imgay:276261810892701696>`
      })
    }

    if (message === '!flip') {
      let flip = ['Heads', 'Tails']
      bot.sendMessage({
        to: channelID,
        message: flip[_.random(0, 1)]
      })
    }

    if (message.startsWith('!8ball')) {
      bot.sendMessage({
        to: channelID,
        message: ball[_.random(0, 19)]
      })
    }

    if (message === '$shinaikara') {
      bot.sendMessage({
        to: channelID,
        message: `<:shinaikara:325273515710480385>`
      })
      setTimeout(() => {
        bot.sendMessage({
          to: channelID,
          message: `<:D_:325274306588311554>`
        })
        setTimeout(() => {
          bot.sendMessage({
            to: channelID,
            message: `<:O_:325273940542881802>`
          })
        }, 1000)
      }, 1000)
    }

    if (message.startsWith("$gahaha")) {
      bot.sendMessage({
        to: channelID,
        message: `<:gahaha:295524754104778755>`
      })
    }

    if (message.startsWith("$bleh")) {
      bot.sendMessage({
        to: channelID,
        message: `<:bleh:314246697775529985>`
      })
    }
  })

  function doRoll (message) {
    let parts = message.split(' ')
    if (parts.length === 1) return _.random(1, 99)
    if (parts.length === 2) return _.random(1, parts[1])
    if (parts.length === 3) return _.random(parts[1], parts[2])
    return 'thats not how you do that'
  }
}
