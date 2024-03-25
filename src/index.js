/* Import dependencies */
import express from 'express';
import path from 'path';
import Database from './services/database.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Create express instance */
const app = express();
const port = 3000;

/* Add form data middleware */
app.use(express.urlencoded({extended: true}));

// Integrate Pug with Express
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './static/views'));

// Serve assets from 'static' folder
app.use(express.static('static'));

const db = await Database.connect();

/* Landing route */
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/continents', async (req, res, next) => {
	try {
		const continents = await db.getContinents();
		res.render('continents', {continents}); // Pass cities as an object
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/continents/:name', async (req, res, next) => {
	try {
		const continent = await db.getContinent(req.params.name);
		const continentCountries = await db.getCountries(req.params.name);
		res.render('continent_countries', {continent, continentCountries});
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/continents/:continent/:countryName', async (req, res, next) => {
	try {
		const country = await db.getCountry(req.params.countryName);
		const countryCities = await db.getCities(req.params.countryName);
		res.render('country_cities', {country, countryCities});
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/cities', async (req, res, next) => {
	try {
		const cities = await db.getCities();
		res.render('cities', {cities}); // Pass cities as an object
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/cities/city/:id', async (req, res, next) => {
	try {
		const city = await db.getCity(req.params.id);
		res.render('city', {city}); // Pass cities as an object
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

// Run server!
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
