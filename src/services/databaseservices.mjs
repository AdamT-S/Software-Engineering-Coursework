import mysql from "mysql2/promise";
import City from "../models/city.mjs";
import Country from "../models/country.mjs";

export default class DatabaseService {
    conn;

    constructor(conn) {
        this.conn = conn;
    }

    /* Establish database connection and return the instance */
    static async connect() {
        const conn = await mysql.createConnection({
            host: process.env.DATABASE_HOST || "localhost",
            user: "root",
            password: "",
            database: "world",
        });

        return new DatabaseService(conn);
    }

    /* Get a list of all cities */
    async getAllCities() {
        try {
            // Fetch cities from database
            const data = await this.conn.execute("SELECT * FROM `city`");
            return data;
        } catch (err) {
            // Handle error...
            console.error(err);
            return undefined;
        }
    }

    async getCities(countryName) {
        try {
            const sql = `
            SELECT city.*
            FROM city
            JOIN country ON country.Code = city.CountryCode
            WHERE country.Name = '${countryName}';
            `;
            const [rows, fields] = await this.conn.execute(sql);
            return rows;
        } catch (err) {
            console.error("Error fetching cities by country:", err);
            return [];
        }
    }
    // SQL statement that updates a city name
    async  updateCityName(cityId, newName) {
        try {
            const sql = `UPDATE city SET Name = '${newName}' WHERE ID = ${cityId}`;
            const [result] = await this.conn.execute(sql);
            return result;
        } catch (err) {
            console.error("Error updating city name:", err);
            return false;
        }
    }

    /* Get a particular city by ID, including country information */
    async getCity(cityId) {
        const sql = `
        SELECT city.*, country.Name AS Country, country.Region, country.Continent, country.Population as CountryPopulation
        FROM city
        INNER JOIN country ON country.Code = city.CountryCode
        WHERE city.ID = ${cityId}
    `;
        const [rows, fields] = await this.conn.execute(sql);
        /* Get the first result of the query (we're looking up the city by ID, which should be unique) */
        const data = rows[0];
        const city = new City(
            data.ID,
            data.Name,
            data.CountryCode,
            data.District,
            data.Population
        );
        const country = new Country(
            data.Code,
            data.Country,
            data.Continent,
            data.Region,
            data.CountryPopulation
        );
        city.country = country;
        return city;
    }
    
    /* Delete a city by ID */
    async removeCity(cityId) {
        const res = await this.conn.execute(
            `DELETE FROM city WHERE id = ${cityId}`
        );
        console.log(res);
        return res;
    }

    /* Get a list of countries */
    async getAllCountries() {
        const sql = `SELECT * FROM country`;
        const [rows, fields] = await this.conn.execute(sql);
        const countries = rows.map(c => new Country(c.Code, c.Name, c.Continent, c.Region, c.Population));
        return countries;
    }

    // SQL statement that updates country name
    async updateCountryName(countryCode, newName) {
        try {
            const sql = `UPDATE country SET Name = '${newName}' WHERE Code = '${countryCode}'`;
            const [result] = await this.conn.execute(sql);
            return result;
        } catch (err) {
            console.error("Error updating country name:", err);
            return false;
        }
    }
    
    // SQL statement that gets all the countries based on a named continent
    async getCountries(continentName) {
        try {
            const sql = `
            SELECT *
            FROM country
            WHERE Continent = '${continentName}';
            `;
            const [rows, fields] = await this.conn.execute(sql);
            return rows;
        } catch (err) {
            console.error("Error fetching countries by continent:", err);
            return [];
        }
    }

    // SQL statement that deletes countries
    async deleteCountry(countryCode) {
        try {
            const sql = `DELETE FROM country WHERE Code = '${countryCode}'`;
            const [result] = await this.conn.execute(sql);
            return result;
        } catch (err) {
            console.error("Error deleting country:", err);
            return false;
        }
    }

    // SQL statement that gets all of the continents
    async getContinents() {
        try {
            const sql = `
            SELECT Continent, SUM(country.Population) AS Population
            FROM country
            GROUP BY Continent
            `;
            const [rows, fields] = await this.conn.execute(sql);
            return rows;
        } catch (err) {
            console.error("Error fetching continents:", err);
            return [];
        }
    }
    
    async getContinent(Continent) {
        try {
            const sql = `
            SELECT Continent, SUM(country.Population) AS Population
            FROM country
            WHERE Continent = ${Continent}
            GROUP BY Continent
            `;
            const [rows, fields] = await this.conn.execute(sql);
            return rows;
        } catch (err) {
            console.error("Error fetching continents:", err);
            return [];
        }
    }
    // SQL statement that deletes continents
    async deleteContinent(continentName) {
        try {
            const sql = `DELETE FROM country WHERE Continent = '${continentName}'`;
            const [result] = await this.conn.execute(sql);
            return result;
        } catch (err) {
            console.error("Error deleting continent:", err);
            return false;
        }
    }
    
    // SQL statement that updates continent name
    async updateContinentName(oldContinentName, newContinentName) {
        try {
            const sql = `UPDATE country SET Continent = '${newContinentName}' WHERE Continent = '${oldContinentName}'`;
            const [result] = await this.conn.execute(sql);
            return result;
        } catch (err) {
            console.error("Error updating continent name:", err);
            return false;
        }
    }
}