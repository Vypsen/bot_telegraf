const { session} = require('telegraf')
const { Telegraf,  Scenes: { BaseScene, Stage } } = require('telegraf')
require('dotenv').config()
const weatherScene = require('./weather/weather-scene')
const reminderScene = require('./reminder/reminder-scene')
const {Db} = require('./help/db_method')
const db = new Db()

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([weatherScene,reminderScene])
stage.hears('exit', ctx => ctx.scene.leave())
bot.use(session())
bot.use(stage.middleware())

bot.use( (ctx,next) => {
    console.log(1234567890)
    const chat_id = ctx.chat.id
    setInterval(checkTimeTask, 60000, chat_id)  

    async function  checkTimeTask(chat_id){
        const user_id = await db.getUserId(chat_id)
        const data_min_time_task = await db.getMinTimeTask(user_id)
        const min_time = new Date(data_min_time_task.time_task)
        const now = new Date()

        if (now.getFullYear() == min_time.getFullYear() &&
            now.getMonth() == min_time.getMonth() &&
            now.getDay() == min_time.getDay() &&
            now.getHours() == min_time.getHours() &&
            now.getMinutes() == min_time.getMinutes())
        {
            ctx.reply(data_min_time_task.description)
            await db.deleteMinTimeTask(user_id)
        }   
    }

    next()
})



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