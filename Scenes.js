const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const { getTranslate, getLocation, getWeather } = require('./requests')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()
const CloudConvert = require('cloudconvert');

const weatherScene = new BaseScene('weatherScene')
const stage = new Stage([weatherScene])



weatherScene.enter((ctx) => ctx.reply('укажите населеный пункт или напишите на exit чтобы выйти из меню погоды', exit_keyboard))

weatherScene.on('text', async ctx => {
    const city = ctx.message.text
    const city_on_eng = await getTranslate(city)
    const city_data = await getLocation(city_on_eng)
    const lat = city_data[0].geometry.lat
    const lon = city_data[0].geometry.lng
    const weather_data = await getWeather(lat, lon)
    const message = postMessage(weather_data)

    const html = `
<strong>Температура:</strong>  ${message.temp}°C
<strong>Ощущается как:</strong>  ${message.feels_like}°C
<strong>Влажность:</strong>  ${message.humidity}%
<strong>Скорость ветра:</strong>  ${message.wind_speed}м/c`
    ctx.replyWithHTML(html)
})
const postMessage = (weather_data) => {
    const { temp, feels_like, condition, wind_speed, humidity, icon } = weather_data.fact
    return { temp, feels_like, condition, wind_speed, humidity, icon };

}

stage.hears('exit', ctx => ctx.scene.leave())
module.exports = stage