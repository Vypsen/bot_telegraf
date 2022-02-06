//ZALUPA
// const TelegramBot = require('node-telegram-bot-api')
// require('dotenv').config()

// const bot = new TelegramBot(process.env.BOT_TOKEN, {
//     polling: true
// })

// bot.onText(/\/start (.+)/, (msg, [command, command_text]) => {
//     console.log('1')
//     const { id } = msg.chat
//     bot.sendMessage(id, JSON.stringify(command_text, null, 4))
// })

// bot.onText(/\/start/, (msg) => {
//     const { id } = msg.chat
//     bot.sendMessage(id, 'введите нужный город после команды weather')
// })


const { session, Scenes: { BaseScene, Stage } } = require('telegraf')
const { Telegraf } = require('telegraf')
const stage = require('./Scenes')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(session())
bot.use(stage.middleware())
bot.start(ctx => ctx.reply('111'))

bot.command('weather', (ctx) => ctx.scene.enter('weatherScene'))

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))