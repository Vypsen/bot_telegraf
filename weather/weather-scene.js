const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const { getTranslate, getLocation, getWeather } = require('../help/requests')
const exit_keyboard = Markup.keyboard(['exit']).oneTime().resize()

const weatherScene = new BaseScene('weatherScene')

weatherScene.enter(ctx => {
    ctx.reply('укажите населенный пункт или напишите на exit чтобы выйти из меню погоды',
    exit_keyboard
)})

weatherScene.on('text', async ctx => {
    const city = ctx.message.text
    try 
    {
        const message = await createMessage(city)
        ctx.replyWithHTML(message)
    } catch (error) {
        ctx.reply('Введите верное название населенного пункта')
    }
    
})
weatherScene.leave(ctx => {ctx.reply(
    "выход из меню погоды",Markup.removeKeyboard()
)})


const createMessage = async (city) => {
    const city_on_eng = await getTranslate(city)
    const city_data = await getLocation(city_on_eng)
    const lat = city_data[0].geometry.lat
    const lon = city_data[0].geometry.lng
    
    console.log(lat,lon)
    if(city_data[0].components._type == 'city' || city_data[0].components._type == 'village')
    {
        const weather_data = await getWeather(lat, lon)
        const { temp, feels_like, condition, wind_speed, humidity, icon } = weather_data.fact
        
        const html = `
<strong>Температура:</strong>  ${temp}°C
<strong>Ощущается как:</strong>  ${feels_like}°C
<strong>Влажность:</strong>  ${humidity}%
<strong>Скорость ветра:</strong>  ${wind_speed} м/c`
        return html
    }
    else
    {
        return ('Введите верное название населенного пункта')
    }
    
}

module.exports = weatherScene