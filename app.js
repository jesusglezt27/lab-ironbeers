const express = require('express');

const hbs = require('hbs');
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(displayBeers => {
      console.log(displayBeers);
      const data = {
        beersArr: displayBeers
      };
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beers', randomBeer[0]);
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res, next)=>{
  punkAPI.getBeer(id);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
