/* Import dependencies */
import express from 'express';
import database from './services/database.js';

/* Create express instance */
const app = express();
const port = 3000;

/* Add form data middleware */
app.use(express.urlencoded({extended: true}));

// Integrate Pug with Express
app.set('view engine', 'pug');

// Serve assets from 'static' folder
app.use(express.static('static'));

const db = await database.connect();
const {conn} = db;

/* Landing route */
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/cities', async (req, res) => {
	const [rows, fields] = await db.getCities();
	/* Render cities.pug with data passed as plain object */
	return res.render('cities', {rows, fields});
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
