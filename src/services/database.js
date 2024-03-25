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
					name: 'Continent1',
					numberOfCountries: 100,
					totalPopulation: 2000000,
				},
				{
					id: 2,
					code: 2,
					name: 'Continent2',
					numberOfCountries: 200,
					totalPopulation: 2000000,
				},
				{
					id: 3,
					code: 3,
					name: 'Continent3',
					numberOfCountries: 300,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent4',
					numberOfCountries: 400,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent5',
					numberOfCountries: 500,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent6',
					numberOfCountries: 600,
					totalPopulation: 2000000,
				},
				{
					id: 4,
					code: 4,
					name: 'Continent7',
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
	async getContinent(continentName) {
		try {
			const data = {
				id: 4,
				code: 4,
				name: continentName,
				numberOfCountries: 600,
				totalPopulation: 2000000,
			};
			return data;
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}
	/* Get a list of all countries */
	async getCountries(continent) {
		try {
			let data;
			if (!continent) {
				// all countries
				data = [
					{id: 1, code: 1, name: ' country1', numberOfCities: 5, totalPopulation: 100},
					{id: 2, code: 2, name: ' country2', numberOfCities: 5, totalPopulation: 200},
					{id: 3, code: 3, name: ' country3', numberOfCities: 5, totalPopulation: 300},
					{id: 4, code: 4, name: ' country4', numberOfCities: 5, totalPopulation: 400},
				];
			} else {
				// if specified name -> filter
				data = [
					{
						id: 1,
						code: 1,
						name: `country1_In_${continent}`,
						numberOfCities: 5,
						totalPopulation: 100,
					},
					{
						id: 2,
						code: 2,
						name: `country2_In_${continent}`,
						numberOfCities: 5,
						totalPopulation: 200,
					},
					{
						id: 3,
						code: 3,
						name: `country3_In_${continent}`,
						numberOfCities: 5,
						totalPopulation: 300,
					},
					{
						id: 4,
						code: 4,
						name: `country4_In_${continent}`,
						numberOfCities: 5,
						totalPopulation: 400,
					},
				];
				return data;
			}
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}
	async getCountry(countryName) {
		try {
			const data = {
				id: 4,
				code: 4,
				name: countryName,
				numberOfCities: 600,
				totalPopulation: 2000000,
			};
			return data;
		} catch (err) {
			// Handle error...
			console.error(err);
			return undefined;
		}
	}
	/* Get a list of all cities */
	async getCities(country) {
		try {
			let data;
			if (!country) {
				// all cities
				data = [
					{id: 1, code: 1, name: 'city1', population: 100},
					{id: 2, code: 2, name: 'city2', population: 200},
					{id: 3, code: 3, name: 'city3', population: 300},
					{id: 4, code: 4, name: 'city4', population: 400},
				];
			} else {
				// if specified name -> filter
				data = [
					{id: 1, code: 1, name: `city1_In ${country}`, population: 100},
					{id: 2, code: 2, name: `city2_In ${country}`, population: 200},
					{id: 3, code: 3, name: `city3_In ${country}`, population: 300},
					{id: 4, code: 4, name: `city4_In ${country}`, population: 400},
				];
			}
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
}
