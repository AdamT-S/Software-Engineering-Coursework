export default class City {
	id;
	name;
	countryCode;
	district;
	population;
	country;

	constructor(id, name, countryCode, district, population) {
		this.id = id;
		this.name = name;
		this.countryCode = countryCode;
		this.district = district;
		this.population = population;
	}
}
