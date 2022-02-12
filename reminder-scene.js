const { Scenes: { BaseScene }, Markup } = require('telegraf')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()
const remove_keyboard = Markup.removeKeyboard()
const {Db} = require('./db_method')
const db = new Db()
require('dotenv').config()

const reminderScene = new BaseScene('reminderScene')

const date_pattern = /\d{1,2}.\d{1,2}.\d{2,4} \d{1,2}:\d{2}/            //pattern for date 

reminderScene.enter(ctx =>{ctx.reply(
    'message format: "event dd.mm.yy hh:mm"',
    exit_keyboard)    
})

reminderScene.leave(ctx => {ctx.reply(
    "exit reminder ",
    remove_keyboard)
})

reminderScene.on('text', async ctx=>{
    var user_message = ctx.message.text
    const arr_user_message = user_message.split(" ")

    var year = arr_user_message[arr_user_message.length-2] // get dd.mm.yy
    var time = arr_user_message[arr_user_message.length-1]              //get time

    var reminer_time = year + ' ' + time    //year + time

    if(arr_user_message.length < 3 || !date_pattern.test(reminer_time) ) //check message format 
    {
        return ctx.reply('invalid input')
    }
    var year = year.split('.')   // get dd.mm.yy

    const date = new Date(`${year[1]}.${year[0]}.${year[2]} ${time}`)   //date in the format mm.dd.yy
    if(date == 'Invalid Date')return ctx.reply('invalid input')
    var user_message_without_time  = '' 
    for (i = 0; i < arr_user_message.length-2; i++) {               //get event from message
        user_message_without_time +=  arr_user_message[i] + ' '
    }

    const user_id = await db.getUserId(ctx.chat.id)    //get id user
    const post_date = ((date.toString().split(" ", 5)).join(" ")) //date example: Tue Mar 15 2022 15:00:00

    try {
        db.setReminderDb(user_message_without_time, user_id, post_date)   //post task on db
    } catch (error) {
        console.log('invalid input')
    }

})


module.exports = reminderScene