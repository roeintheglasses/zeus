const request = require('request')

const geocode = (address, callback) => {
    const urlMapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9lMTAxIiwiYSI6ImNrNWh3MjZmMTA4M2EzbnBhdWRuYzdib2MifQ.ozwuUkb5Bq20vWqafrXo9g&limit=2'

    request({
        url: urlMapbox,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback("Location not found!", undefined)

        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
            })
        }

    })


}

module.exports = geocode