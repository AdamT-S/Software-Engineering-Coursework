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
