const { Pool, Client } = require('pg')
require('dotenv').config()


class Bd{

    
    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'users_daily_bot',
            password: process.env.PASSWORD_PG,
            port: process.env.PORT_PG,
        })
    }
    

    async setUserBd(id_chat){
        this.pool
        .query(`INSERT INTO chat(chat_id) VALUES (${id_chat})`)
        .then(res => console.log(res.rows))
        .catch(e => console.error(e.stack))
        
    }
}

module.exports = {Bd}