import DatabaseService from './services/databaseservices.mjs';
const db = await DatabaseService.connect();
const {conn} = db;

const cityToDeleteInput = document.querySelector('#cityDelete');
const countryToDeleteInput = document.querySelector('#countryDelete');
const continentToDeleteInput = document.querySelector('#continentDelete');

cityToDeleteInput.addEventListener('change', (e) => console.log(e.target.value));
// export default class Actions{

// }
