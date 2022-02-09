const axios = require('axios')
const translate_lib = require('translate-google')
require('dotenv').config()


const getTranslate = (city) => {
    return translate_lib(city, { to: 'en' })
        .then((res) => {
            return (res)
        })
        .catch(err => {
            console.error(err)
        })
}

const getLocation = (city) => {
    const url_geo = `https://api.opencagedata.com/geocode/v1/json?countrycode=ru&language=ru&q=${city}&pretty=1&limit=1&key=594fb21a3fe743eab4c0d6b3b67b3056&pretty=1`
    return axios.get(url_geo, {
            headers: {
                'Content-Type': 'application/json',
            },

        })
        .then(res => {
            return res.data.results
        })
}

const getWeather = (lat, lon) => {
    const url = `https://api.weather.yandex.ru/v2/informers?lat=${lat}&lon=${lon}`
    return axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Yandex-API-Key': 'f9b46993-e2c4-4b06-b5d6-a57dc8ab84d0'
            },
        })
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.log(error)
        })
}


module.exports = { getTranslate, getLocation, getWeather }