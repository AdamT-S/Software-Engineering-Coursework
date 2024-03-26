/* Import dependencies */
import express from 'express';
import path from 'path';
import DatabaseService from './services/databaseservices.mjs';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {} from 'module';

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

const db = await DatabaseService.connect();
const {conn} = db;

/* Landing route */
app.get('/', (req, res) => {
	res.render('index');
});
app.get('/login', (req, res) => {
	res.render('login');
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
		let name = req.params.name.replaceAll('%20', '');
		const [continent, fields] = await db.getContinent(req.params.name);
		const continentCountries = await db.getCountries(req.params.name);
		res.render('continent_countries', {continent, continentCountries});
		console.log(`continent ${continentCountries[0]}`);
		// console.log(`continentCountries ${continentCountries}`);
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/continents/:continent/:countryName', async (req, res, next) => {
	try {
		let name = req.params.countryName.replaceAll('%20', '');
		const country = await db.getCountryName(name);
		const countryCities = await db.getCities(name);
		console.log(countryCities);
		res.render('country_cities', {country, countryCities});
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/cities', async (req, res, next) => {
	try {
		const [cities, fields] = await db.getAllCities();
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

// Handle form submission
app.get('/submit-form', async (req, res, next) => {
	try {
		const check = (name) => {
			if (name != '') return true;
			else return false;
		};
		const city = req.query.cityDelete; // Get city input value
		const country = req.query.countryDelete; // Get country input value

		db.removeCity(check(city));
		db.deleteCountry(check(country));
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});
// Run server!
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
