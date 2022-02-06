const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
var weather = require('openweather-apis')
const weatherScene = new BaseScene('weatherScene')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()
weatherScene.enter((ctx) => ctx.reply('укажите населеный пункт или напишите на exit чтобы выйти из меню погоды', exit_keyboard))
const stage = new Stage([weatherScene])
const getWeather = require('./get-weather')

weatherScene.on('text', ctx => {
    const api_key = process.env.WEATHER_API_KEYS
    const city = ctx.message.text
    weather.setAPPID(api_key)
    weather.setLang('ru')
    weather.setUnits('metric')
    weather.setCity(city)
    weather.getSmartJSON(function(err, data) { ctx.reply(data) })
        // weather.getAllWeather(function(err, pres) {
        //     ctx.reply(pres);
        // });

})




stage.hears('exit', ctx => ctx.scene.leave())
module.exports = stage