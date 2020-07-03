const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.port || 3000

//Defines path for Express configs
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        name: "Andrew Mead",
        title: "Weather App",
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Andrew Mead"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Our support team is ready to help you 24 x 7. Feel free to contact!",
        title: "Help",
        name: "Andrew Mead"
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                });
            })
        })

    } else {
        res.send({
            error: "Provide address"
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help article not found!!",
        name: "Andrew Mead",
        title: '404'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found!!",
        name: "Andrew Mead",
        title: '404'
    });
})

app.listen(port, () => {
    console.log("Server is up on port "+port);
})