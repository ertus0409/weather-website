const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arthur Ucar'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        assistantName: 'Ms. Jane',
        issue: 'problem logging into the app',
        title: 'Help',
        name: 'Arthur Ucar'
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arthur Ucar',
    });
});


app.get('/weather', (req, res) => {
    // Check if address provided
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    // Query geocode from address
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        // Handle errors
        if (error) {
            return res.send({ error });
        }
        
        // Query forecast from geocode
        forecast(latitude, longitude, (error, forecast) => {
            // Handle errors
            if (error) {
                return res.send({ error });
            }
            
            // Send forecast data if success
            res.send({
                location: location,
                forecast,
                address: req.query.address
            });
        });
    });

});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Arthur Ucar',
        errorMessage: 'Help Article Not Found!'
    });
});


// Should be placed last because express searches routes from top to bottom until a match is found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Arthur Ucar',
        errorMessage: 'Page Not Found!'
    });
});


app.listen(port, () => {
    console.log('Server listening on port ' + port + '.');
})
