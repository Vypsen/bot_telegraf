const { Scenes: { BaseScene }, Markup } = require('telegraf')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()
const remove_keyboard = Markup.removeKeyboard()
const {Db} = require('../help/db_method')
const db = new Db()
require('dotenv').config()

const reminderScene = new BaseScene('reminderScene')

reminderScene.enter(ctx =>{ctx.reply(
    'message format: "event dd.mm.yy hh:mm"',
    exit_keyboard)    
})

reminderScene.leave(ctx => {ctx.reply(
    "exit reminder ",
    remove_keyboard)
})

reminderScene.on('text', async ctx=>{ 

    const date_pattern = /\d{1,2}.\d{1,2}.\d{2,4} \d{1,2}:\d{2}/            
    try {
        const chat_id = ctx.chat.id
        const user_message = ctx.message.text
        user_message_in_arr = user_message.split(" ")
        year = user_message_in_arr[user_message_in_arr.length-2] 
        time = user_message_in_arr[user_message_in_arr.length-1]   
        reminer_time = year + ' ' + time    
        // get dd.mm.yy
        year = year.split('.')   
        //date in the format mm.dd.yy
        date = new Date(`${year[1]}.${year[0]}.${year[2]} ${time}`)   

        user_id = await db.getUserId(chat_id)    
        //check message format 
        if(user_message_in_arr.length < 3 || !date_pattern.test(reminer_time)) throw new Error
      
        if(date == 'Invalid Date' || new Date() > date) throw new Error  
        //get event from message
        user_message_without_time  = '' 
        for (i = 0; i < user_message_in_arr.length-2; i++) {               
            user_message_without_time +=  user_message_in_arr[i] + ' '
        }
        //date example: Tue Mar 15 2022 15:00:00
        post_date = ((date.toString().split(" ", 5)).join(" ")) 
        //post task on db
        db.setReminderDb(user_message_without_time, user_id, post_date) 
        
    } catch (error) {
        ctx.reply('invalid input')
    }
})


module.exports = reminderScene