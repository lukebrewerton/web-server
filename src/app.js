const path = require('path');
const express = require('express');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App Homepage'
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
    helpText: 'This is a help message!'
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forcast: 'It is sunny',
    location: 'Brighton'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
