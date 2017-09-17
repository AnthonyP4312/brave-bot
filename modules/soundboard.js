const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const table = require('text-table')

module.exports = (bot) => {
  bot.on('message', (user, userID, channelID, message, event) => {
    if (message.startsWith('$')) {
      if (message === '$list') {
        fs.readdir(`/home/pi/node/brave-bot/soundFiles`, (err, list) => {
          if (err) console.log(err)
          let format = _.flow(_.replace, _.partialRight(_.padEnd, 20))
          bot.sendMessage({
            to: channelID,
            message: table(_.chunk(list.map(str => format(str, '.ogg', '')), 5), {align: ['l', 'l', 'l', 'l', 'l']})
          })
        })
        return
      }

      channelID = bot.getVoiceChannel(event)

      if (message === '$stopsound') {
        bot.getAudioContext(channelID, (error, stream) => {
          if (error) return console.error(error)
          stream.pause()
        })
        return
      }

      bot.joinVoiceChannel(channelID, (error, events) => {
        if (error) console.error(error.message)
        try {
          playSound(channelID, _.replace(message.toLowerCase(), '$', ''))
        } catch (e) {
          console.log(e)
        }
      })
    }

    if (message === ':10:') {
      bot.joinVoiceChannel(channelID, (error, events) => {
        if (error) console.error(error.message)
        try {
          playSound(channelID, _.replace(message.toLowerCase(), '$', ''))
        } catch (e) {
          console.log(e)
        }
      })
    }
  })

  function playSound (channelID, filename) {
    // Then get the audio context
    bot.getAudioContext(channelID, (error, stream) => {
      // Once again, check to see if any errors exist
      if (error) return console.error(error)

      // Create a stream to your file and pipe it to the stream
      // Without {end: false}, it would close up the stream, so make sure to include that.
      console.log('Playing sound:', filename)
      fs.access(path.join(`/home/pi/node/brave-bot/soundFiles`, `${filename}.ogg`), (err) => {
        if (err) {
          bot.sendMessage({
            to: channelID,
            message: 'bad filename'
          })
        } else {
          try {
            var read = fs.createReadStream(
              path.join(`/home/pi/node/brave-bot/soundFiles`, `${filename}.ogg`))
            console.log('Stream made', __dirname)
            read.on('open', () => {
              console.log('in open event', __dirname)
              read.pipe(stream, {
                end: false
              })
              console.log('after pipe')
            })
          } catch (e) {
            bot.sendMessage({
              to: channelID,
              message: 'bad filename'
            })
          }
        }
      })
    })
  }
}
