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

app.get('/cities', async (req, res, next) => {
	try {
		const cities = await db.getCities();
		res.render('cities', {cities}); // Pass cities as an object
	} catch (err) {
		next(err); // Pass error to the next middleware
	}
});

app.get('/cities/:id', async (req, res) => {
	const cityId = req.params.id;
	const city = await db.getCity(cityId);
	return res.render('city', {city});
});

// Run server!
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
