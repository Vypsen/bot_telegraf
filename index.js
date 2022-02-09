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