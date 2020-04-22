const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()
//Define path location, __dirname dung de chi folder chua file app.js nay
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//dynamic access by npm hbs@4.0.1
app.set('view engine', 'hbs')
app.set('views', viewsPath) //neu file .hbs khong nam trong folder 'views' thi phai khai bao nhu the nay^^
hbs.registerPartials(partialsPath)
//static access, khai bao cac file .html
app.use(express.static(publicDirectory))
//Khi dung index.html thi fn ben duoi ko dung duoc
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })
//send back json, or object
// app.get('/help', (req, res) => {
// res.send([{
//     name: 'Minh',
//     age: 30
//     }, { 
//     name: 'Than',
//     age: 31
// }])
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Footer',
        message: 'How to check weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About-page',
        name: 'Footer',
        message: 'Here to tell you a bit of this web'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help-page',
        message: 'to help finding more information',
        name: 'Footer'
        
    })
})

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide an address' })
    }               
        geocode (req.query.address, (error, {latitude, longitude, geolocation} = {}) => {
            if (error) {
                return res.send({ error })
            } 
            forecast (latitude, longitude, (error, forecastResult) => {
                if (error) {
                    return res.send({ error })
                } 
                res.send({
                    address: req.query.address,
                    geolocation,
                    forecast: forecastResult
                })
            })
        })
})

// Vi du ve query String:
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please fill out a search item'
        })
        // khi co return thi fn se stop tai day
    }
    //console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help data not exist')
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Help article not found',
        name: 'Created by Mira'
    })
})

app.get('/*', (req, res) => {
    //res.send('Page not found!!!^^')
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Page not found',
        name: 'Created by Mira'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})