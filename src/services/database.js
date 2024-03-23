import City from '../models/city.js';
import Country from '../models/country.js';

export default class Database {
	conn;
	constructor() {}

	/* Establish database connection and return the instance */
	static async connect() {
		this.conn = new Database();
		return this.conn;
	}

	/* Get a list of all cities */
	async getCities() {
		try {
			const data = [
				{code: 1, name: 'city1', population: 100},
				{code: 2, name: 'city2', population: 200},
				{code: 3, name: 'city3', population: 300},
				{code: 4, name: 'city4', population: 400},
			];
			return data;
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
