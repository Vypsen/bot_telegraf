// CREATE TABLE Users(
// 	id SERIAL PRIMARY KEY,
// 	chat_id VARCHAR UNIQUE,
// 	first_name_user VARCHAR
// );

// CREATE TABLE Tasks(
// 	id SERIAL PRIMARY KEY,
// 	description VARCHAR,
// 	user_id INT,
// 	FOREIGN KEY (user_id) REFERENCES Users (id)
// );

const { Pool, Client } = require('pg')
require('dotenv').config()

class Db{
    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'users_daily_bot',
            password: process.env.PASSWORD_PG,
            port: process.env.PORT_PG,
        })
    }
    
    async getUserId(chat_id){
        return this.pool
        .query(`SELECT ID FROM Users 
                WHERE chat_id = '${chat_id}'`)
        .then(res => {return res.rows[0].id})
        .catch(e => console.error(e.stack))
    }

    async setUserDb(chat_id, first_name_user){
        this.pool
        .query(`INSERT INTO Users (chat_id, first_name_user) 
            VALUES (${chat_id}, '${first_name_user}')`)
        .then(res => console.log(res.rows))
        .catch(e => console.error(e.stack))
    }

    async setReminderDb(description, user_id, time_task){
        return this.pool
        .query(`INSERT INTO tasks (description, user_id, time_task)
            VALUES ('${description}', '${user_id}', '${time_task}')`)
        .then(res => console.log(res.rows))
        .catch(e => {console.log(e.stack)})
    }

    async getMinTimeTask(user_id){
        return this.pool
        .query(`SELECT * FROM tasks 
        WHERE time_task = 
        (SELECT MIN(time_task) 
        FROM TASKS
         WHERE user_id = ${user_id}
         ) AND user_id = ${user_id}`)
        .then(res => {return res.rows[0]})
        .catch(e => {console.log(e.stack)})
    }

    async deleteMinTimeTask(user_id){
        return this.pool
        .query(`DELETE FROM tasks 
        WHERE time_task = 
        (SELECT MIN(time_task) 
        FROM TASKS
         WHERE user_id = ${user_id}
         ) AND user_id = ${user_id}`)
        .then(res => {return res.rows[0]})
        .catch(e => {console.log(e.stack)})
    }


}

module.exports = {Db}