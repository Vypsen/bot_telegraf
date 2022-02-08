const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const { getTranslate, getLocation, getWeather } = require('./requests')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()

const weatherScene = new BaseScene('weatherScene')
const stage = new Stage([weatherScene])
weatherScene.enter((ctx) => ctx.reply('укажите населеный пункт или напишите на exit чтобы выйти из меню погоды', exit_keyboard))

weatherScene.on('text', async ctx => {
    const city = ctx.message.text
    const city_on_eng = await getTranslate(city)
    const city_data = await getLocation(city_on_eng)
    const lat = city_data[0].geometry.lat
    const lon = city_data[0].geometry.lng
    console.log(await getWeather(lat, lon))
})

stage.hears('exit', ctx => ctx.scene.leave())
module.exports = stage