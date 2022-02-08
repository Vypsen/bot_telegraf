const axios = require('axios')
const translate_lib = require('translate-google')

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
    const url = `https://api.weather.yandex.ru/v2/forecast?/lat=${lat}&lon=${lon}&extra=true`
    return axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Yandex-API-Key': 'd7a353f2-7ab6-4562-9ca2-e9be82eff6fb'
            },

        })
        .then(res => {
            return res
        })
        .catch(error => {
            console.log(error)
        })
}


module.exports = { getTranslate, getLocation, getWeather }