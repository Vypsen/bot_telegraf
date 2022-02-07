const axios = require('axios')
const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const getWeather = require('./get-weather')
var weather = require('openweather-apis')

const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()

const weatherScene = new BaseScene('weatherScene')
const stage = new Stage([weatherScene])
weatherScene.enter((ctx) => ctx.reply('укажите населеный пункт или напишите на exit чтобы выйти из меню погоды', exit_keyboard))


weatherScene.on('text', ctx => {

    const city = ctx.message.text
    const translate = require('translate-google')

    translate(city, { to: 'en' }).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)
    })

    const url_geo = 'https://api.opencagedata.com/geocode/v1/json?countrycode=ru&language=ru&q=moscow&pretty=1&limit=1&key=594fb21a3fe743eab4c0d6b3b67b3056'
    axios.get(url_geo, {
            headers: {
                'Content-Type': 'application/json',
            },

        })
        .then(res => { console.log(res.data.results) })


    const url = 'https://api.weather.yandex.ru/v2/forecast?/lat=55.75396&lon=37.620393&extra=true'
    axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Yandex-API-Key': 'd7a353f2-7ab6-4562-9ca2-e9be82eff6fb'
            },

        })
        .then(res => { qwe(res.data) })

    // const api_key = process.env.WEATHER_API_KEYS
    // 
    // weather.setAPPID(api_key)
    // weather.setLang('ru')
    // weather.setUnits('metric')
    // weather.setCity(city)
    // weather.getSmartJSON(function(err, data) { ctx.reply(data) })
    //     // weather.getAllWeather(function(err, pres) {
    //     //     ctx.reply(pres);
    //     // });

})

const qwe = (a) => {
    // console.log(a)
}




stage.hears('exit', ctx => ctx.scene.leave())
module.exports = stage