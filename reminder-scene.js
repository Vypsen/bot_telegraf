const { Scenes: { BaseScene }, Markup } = require('telegraf')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()
const remove_keyboard = Markup.removeKeyboard()
const {Bd} = require('./bd_method')
const bd = new Bd()

require('dotenv').config()

const reminderScene = new BaseScene('reminderScene')

reminderScene.enter(ctx =>{ctx.reply(
    'написать напоминание в формате: "событие" "дата и время в формате 00.00.00 дд.мм.гг "',
    exit_keyboard)    
})

reminderScene.leave(ctx => {ctx.reply(
    "выход напоминания",
    remove_keyboard)
})

reminderScene.on('text', ctx=>{
    var user_message = ctx.message.text
    user_message = user_message.split(" ")
    console.log(user_message)
})


module.exports = reminderScene