const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2bc3df686e02216bf702e741b57f4781/' + lat + ',' + long + '?units=si'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {

        if (error) {
            callback("Unable to connect to the weather service!", undefined)
        } else if (body.error) {
            callback("Location not found!", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + '\nIt\'s currently ' + body.currently.temperature + ' degress out and feels like ' + body.currently.apparentTemperature + '\nThere\'s a ' + body.daily.data[0].precipProbability + ' % chance of rain today.')
        }
    })

}

module.exports = forecast