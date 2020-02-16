const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1Ijoicm9lMTAxIiwiYSI6ImNrNWh3MjZmMTA4M2EzbnBhdWRuYzdib2MifQ.ozwuUkb5Bq20vWqafrXo9g&limit=1'

    request({
        url: url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback("Location not found!", undefined)

        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }

    })


}

module.exports = geocode