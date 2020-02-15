const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const location = process.argv[2]


if (!location) {
    console.log("Please provide location")
} else {

    geocode(location, (error, {
        latitude,
        longitude,
        location
    }) => {
        if (error) {
            return console.log('Error', error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log('Error', error)
            }
            console.log(location)
            console.log(forecastData)
        })


    })
}