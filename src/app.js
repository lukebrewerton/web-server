const path = require('path');
const hbs = require('hbs');
const express = require('express');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const patrialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(patrialsPath);

app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Luke Brewerton'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Luke Brewerton'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!',
    helpText: 'This is a help message!',
    name: 'Luke Brewerton'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Oops! 404',
    errorMessage: 'Help article not Found!',
    name: 'Luke Brewerton'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Oops! 404',
    errorMessage: 'Page not Found!',
    name: 'Luke Brewerton'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
