//Java sript file
console.log('Client side JAve sript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=philadelphia').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return console.log(data.error)
        } else { 
            console.log(data.geolocation, data.forecast)
        }
    })
})

const weatherform = document.querySelector('form')
const searchvalue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
   
    const location = searchvalue.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.geolocation
                messageTwo.textContent = data.forecast
            }
        })
    })
})