const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// express path config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// setup static dir
app.use(express.static(path.join(__dirname, '../public')));
// handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App ',
		name: 'Rohan Ganguly',
	});
});
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Rohan Ganguly',
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		message: 'Help page message shows up here',
		name: 'Rohan Ganguly',
		title: 'Help Page',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Must provide address to fetch weather data',
		});
	}
	geocode(req.query.address, (error, { lat, lng, place } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(lng, lat, (error, forecastString) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				place: place,
				forecast: forecastString,
				address: req.query.address,
			});
		});
	});
});
app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term',
		});
	}
	res.send({
		products: [],
	});
});
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		msg404: 'Help aritcle not found',
		name: 'Rohan Ganguly',
	});
});
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		msg404: 'Page not found',
		name: 'Rohan Ganguly',
	});
});
app.listen(3000, () => {
	console.log('Running');
});
