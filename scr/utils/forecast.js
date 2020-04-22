const request = require('request')

const forecast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7c76a9fcd528c6da3e719cb2a05efdc0&query='+b+','+a+'&units=m'
    
    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather api service', undefined)
        } else if (body.error) {
            callback('Unable to define location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike, ' degrees out.' )
            
            }               
    })
}
module.exports = forecast