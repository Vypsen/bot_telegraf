const { session} = require('telegraf')
const { Telegraf,  Scenes: { BaseScene, Stage } } = require('telegraf')
const weatherScene = require('./weather-scene')
require('dotenv').config()
const reminderScene = require('./reminder-scene')
const {Db} = require('./db_method')
const db = new Db()

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([weatherScene,reminderScene])
stage.hears('exit', ctx => ctx.scene.leave())

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx =>{
    ctx.reply(`Добро пожаловать ${ctx.message.chat.first_name}`)

    try {
        const chat_id = ctx.message.chat.id.toString()
        const first_name_user = ctx.message.chat.first_name
        db.setUserDb(chat_id, first_name_user)
    } catch (error) {
        console.log('ошибка при добавлении в бд')
    }
})

bot.command('weather', (ctx) => {
    ctx.scene.enter('weatherScene')
})
bot.command('reminder', ctx =>{
    ctx.scene.enter('reminderScene')
})
bot.on('text', ctx => {
    ctx.reply('это текст') 
})



bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))