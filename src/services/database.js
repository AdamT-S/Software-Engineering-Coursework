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

	async getContinents() {
		try {
			const data = [
				{
					id: 1,
					code: 1,
					name: 'Continent',
					numberOfCountries: 100,
					totalPopulation: 2000000,
				},
				{
					id: 2,
					code: 2,
					name: 'Continent',
					numberOfCountries: 200,
					totalPopulation: 2000000,
				},
				{
					id: 3,
					code: 3,
					name: 'Continent',
					numberOfCountries: 300,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent',
					numberOfCountries: 400,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent',
					numberOfCountries: 500,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent',
					numberOfCountries: 600,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent',
					numberOfCountries: 700,
					totalPopulation: 2000000,
				},
			];
			return data;
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}
	/* Get a list of all cities */
	async getCities() {
		try {
			const data = [
				{id: 1, code: 1, name: 'city1', population: 100},
				{id: 2, code: 2, name: 'city2', population: 200},
				{id: 3, code: 3, name: 'city3', population: 300},
				{id: 4, code: 4, name: 'city4', population: 400},
			];
			return data;
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}

	/* Get a particular city by ID, including country information */
	async getCity(cityId) {
		try {
			const city = new City(cityId, 'cityName', 'CountryCode1', 'District1', 'Population1');
			return city;
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}

	/* Get a list of countries */
	async getCountries() {}
}
