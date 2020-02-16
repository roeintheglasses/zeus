console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showForecast, manualForecast);

}

function manualForecast(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showManualForecast()
            break;
        case error.POSITION_UNAVAILABLE:
            showManualForecast()
            break;
        case error.TIMEOUT:
            showManualForecast()
            break;
        case error.UNKNOWN_ERROR:
            showManualForecast()
            break;
    }
}


function showManualForecast() {

    messageOne.textContent = 'Autolocaiton not working, Please use manual search!'
    messageTwo.textContent = ''

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
}


function showForecast(position) {

    const address = position.coords.longitude + ',' + position.coords.latitude
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    console.log('/weather?address=' + address)

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}