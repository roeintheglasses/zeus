console.log('Client side javascript file is loaded!')
var skycons = new Skycons({
    "color": "rgb(209, 236, 58)"
});


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')
const currentTemprature = document.querySelector('#temprature')
const mainWeatherIconCanvas = document.querySelector('#main-weather-icon')
const locateMeButton = document.querySelector('#locate-me')
const loading = document.querySelector('#loading')

locateMeButton.onclick = function () {
    navigator.geolocation.getCurrentPosition(showForecast, locationError);
}

showManualForecast()


function locationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            messageOne.textContent = 'Location access is not available. \nPlease use manual search!'
            break;
        case error.POSITION_UNAVAILABLE:
            messageOne.textContent = 'Location access is not available. \nPlease use manual search!'
            break;
        case error.TIMEOUT:
            messageOne.textContent = 'Location access is not available. \nPlease use manual search!'
            break;
        case error.UNKNOWN_ERROR:
            messageOne.textContent = 'Location access is not available. \nPlease use manual search!'
            break;
    }
}

function showManualForecast() {

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value
        messageOne.textContent = ''
        messageTwo.textContent = ''
        currentTemprature.textContent = ''
        skycons.remove(mainWeatherIconCanvas)
        loading.textContent = 'Loading...'

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                loading.textContent = ''
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                    currentTemprature.textContent = data.temprature + "°"
                    skycons.set(mainWeatherIconCanvas, data.icon)
                    skycons.play()
                }
            })
        })
    })
}

function showForecast(position) {

    const address = position.coords.longitude + ',' + position.coords.latitude
    messageOne.textContent = ''
    messageTwo.textContent = ''
    currentTemprature.textContent = ''
    loading.textContent = 'Loading...'
    skycons.remove(mainWeatherIconCanvas)


    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            loading.textContent = ''
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                currentTemprature.textContent = data.temprature + "°"
                skycons.set(mainWeatherIconCanvas, data.icon)
                skycons.play()
            }
        })
    })
}