var weather = require('openweather-apis')
const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const stage = require('./Scenes')

require('dotenv').config()
const api_key = process.env.WEATHER_API_KEYS
const getWeather = (city) => {
    weather.setAPPID(api_key)
    weather.setLang('ru')
    weather.setUnits('metric')
    weather.setCity(city)
    weather.getTemperature(function(err, temp) {
        console.log(temp)
    });



    // fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru$appid=${api_key}}`)
    //     .then(res => res.json())
}
module.exports = getWeather