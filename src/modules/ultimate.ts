var listener
import * as _ from 'lodash'
import { bot, getVoiceChannel } from '../app'
const util = require('../util')

let BRAVE_COUNTER
bot.on('message', function (user, userID, channelID, message, event) {
  if (message === 'I AM BRAVE') {
    bot.sendMessage({
      to: channelID,
      message: makeBraveSolo(userID)
    })
  }

  if (message === 'WE ARE BRAVE') {
    // give instructions
    bot.sendMessage({
      to: channelID,
      message: `Enter enemy hero's name or first if you are first pick.`
    })
    try {
      makeTeamBrave(userID, event)
    } catch (err) {
      console.log(err)
      bot.sendMessage({
        to: channelID,
        message: `I am slain, rip`
      })
    }
  }
})


function makeBraveSolo (userID) {
  let results = {
    hero: heroes[_.random(0, heroes.length - 1)],
    lane: lanes[_.random(0, 3)],
    laneTime: _.random(0, 7),
    talents: [1, 2, 3, 4].map(i => talents[_.random(0, 1)]).join(' '),
    ability: skills[_.random(0, 2)],
    boots: boots[_.random(0, boots.length - 1)],
    build: [1, 2, 3, 4, 5].map(i => items[_.random(1, items.length - 1)]).join('** -> **'),
  }

  return `
    PROVE IT <@!${userID}>.
    Your Hero WILL be **${results.hero}**
    Your Lane WILL be **${results.lane}**
    Your WILL be in your lane for at least **${results.laneTime}** minutes
    Your Talents WILL be ${results.talents}
    Your WILL max ${results.ability} first
    Your boots WILL be **${results.boots}**
    Your build WILL be  **${results.build}**
    `
}

function makeBrave (heroes, items, lanes, members) {
  let results = {
    hero: _.first(heroes),
    lane: _.first(lanes),
    laneTime: _.random(1, 7),
    talents: [1, 2, 3, 4].map(i => talents[_.random(0, 1)]).join(' '),
    ability: skills[_.random(0, 2)],
    boots: boots[_.random(0, 5)],
    build: [1, 2, 3, 4, 5].map(i => items.get()).join('** -> **'),
  }


  return `
  PROVE IT <@!${_.first(members)}>.
  Your Hero WILL be **${results.hero}**
  Your Lane WILL be **${results.lane}**
  Your WILL be in your lane for at least **${results.laneTime}** minutes
  Your Talents WILL be ${results.talents}
  Your WILL max ${results.ability} first
  Your boots WILL be **${results.boots}**
  Your build WILL be  **${results.build}**
  `
}

function makeTeamBrave (userID, event) {
  // find team members
  let channelID = getVoiceChannel(event)
  let members = shuffle(_.keys(_.get(bot, `channels[${channelID}].members`), []).filter((key) => key !== bot.id))
  BRAVE_COUNTER = members.length

  // initialize lists
  let heroList = _.cloneDeep(heroes)
  let itemList = _.cloneDeep(items)
  let lanes = getLanes()

  listener = _.partialRight(readHero, heroList, itemList, lanes, members)
  bot.on('message', listener)
}

function readHero (user, userID, channelID, message, event, heroes, items, lanes, members) {
  if (userID === bot.id) {
    // dont reply to your own messages
    return
  }

  if (heroes.list.includes(message)) {
    // make Brave
    heroes.pick(message)
  } else if (message === 'first') {
    // make Brave
  } else {
    // error message
    bot.sendMessage({
      to: channelID,
      message: 'Invalid Hero'
    })
    return
  }

  bot.sendMessage({
    to: channelID,
    message: makeBrave(heroes, items, lanes, members)
  })
  BRAVE_COUNTER--
  // remove when done
  if (BRAVE_COUNTER <= 0) {
    console.log('REMOVING LISTENER')
    bot.removeListener('message', listener)
  }
}

function getLanes () {
  let lanesList = ['Top', 'Mid', 'Bottom'] // make sure each lane is used
  lanesList.push(lanes[_.random(0, 3)]) // add two other random lanes
  lanesList.push(lanes[_.random(0, 3)])

  return shuffle(lanesList)
}

function shuffle (arr) {
  let count = arr.length
  let swap

  while (count) {
    let rand = _.random(0, count--)
    swap = arr[count]
    arr[count] = arr[rand]
    arr[rand] = swap
  }

  return arr
}

const boots = require('../dataSets/boots')
const items = require('../dataSets/items')
const heroes = require('../dataSets/heroes')
const auras = require('../dataSets/noRepeatItems')

const talents = [':arrow_left:', ':arrow_right:']

const skills = [
  ':regional_indicator_q: ',
  ':regional_indicator_w: ',
  ':regional_indicator_e: '
]

const lanes = [
  'Top',
  'Roaming/Jungle',
  'Mid',
  'Bottom'
]
