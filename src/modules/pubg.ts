import * as _ from 'lodash'
import { bot } from '../app'
const pubg = require('../../dataSets/pubgPlaces')

bot.on('message', (user, userID, channelID, message, event) => {
  if (message.toLowerCase() === 'ff') {
    bot.sendMessage({
      to: channelID,
      message: `${pubg[_.random(0, pubg.length - 1)]}`
    })
  }
})


