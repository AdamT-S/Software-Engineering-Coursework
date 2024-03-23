import City from '../models/city.js';
import Country from '../models/country.js';

export default class DatabaseService {
	conn;

	constructor(conn) {
		this.conn = conn;
	}

	/* Establish database connection and return the instance */
	static async connect() {
		const conn = await mysql.createConnection({
			host: process.env.DATABASE_HOST || 'localhost',
			user: 'user',
			password: 'password',
			database: 'world',
		});

		return new DatabaseService(conn);
	}

	/* Get a list of all cities */
	async getCities() {
		try {
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}

	/* Get a particular city by ID, including country information */
	async getCity(cityId) {}

	/* Get a list of countries */
	async getCountries() {}
}
