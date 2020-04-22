const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWlyYW5ndXllbmF1IiwiYSI6ImNrOTFnM2l1MjBjZDkzbHA2NTcwN3Zwam8ifQ.TiaMlX2f4g4a91BmjzS6SA&limit=1'
    
    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to mapbox api service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to define location', undefined) 
        } else {
            callback (undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                geolocation: body.features[0].place_name })
        }
    })
}

module.exports = geocode