const request = require('request')

const forecast = (lat, long, callback) => {
    const urlDarkSKy = 'https://api.darksky.net/forecast/2bc3df686e02216bf702e741b57f4781/' + lat + ',' + long + '?units=si'
    request({
        url: urlDarkSKy,
        json: true
    }, (error, response) => {

        if (error) {
            callback("Unable to connect to the weather service!", undefined)
        } else if (response.body.error) {
            callback("Location not found!", undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + '\nIt is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast