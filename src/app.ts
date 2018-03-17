import * as Discord from 'discord.io'
import * as _ from 'lodash'
import * as debug from 'debug'
import { config } from 'dotenv'
config();
const log = debug('app');

export const bot = new Discord.Client({
  token: process.env.TOKEN as string,
  autorun: true
})

bot.on('ready', () => {
  log('Logged in as', bot.username, bot.id)
  bot.setPresence({
    game: {
      name: 'ULTIMATE BRAVERY',
      type: 0,
    },
    idle_since: null,
  })
})

bot.on('disconnect', (err: any, code: any) => {
  throw new Error(err);
})

export function getVoiceChannel(event: any) {
  return _.findKey(bot.channels, (channel: any) => {
    return _.has(channel.members, event.d.author.id)
  })
}

// require modules
require('./modules/misc')(bot)
require('./modules/ultimatebravery')(bot)
require('./modules/pubg')(bot)
require('./modules/soundboard')(bot)
require('./modules/statistics')(bot)
require('./modules/soundVolume')(bot)
require('./modules/terminalchat')(bot)
