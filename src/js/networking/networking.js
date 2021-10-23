/** API & Network**/
// const axios = require('axios');

//get pokemon data from pokeapi.co
export async function getPokemon(pokemonName, username) {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		username: `${username}`,
	};
	if (parseInt(pokemonName)) {
		return await axios
			.get(`localhost:8080/pokemon/get/${pokemonName}`, headers)
			.then((response) => response.json());
	} else {
		return await axios
			.get(`localhost:8080/pokemon/query?name=${pokemonName}`, headers)
			.then((response) => response.json());
	}
}

//get a list of all the pokemon's from the same type
export async function getPokemonsOfType(type) {
	try {
		return await fetch(`https://pokeapi.co/api/v2/type/${type}`)
			.then((response) => response.json())
			.then((data) => data.pokemon);
	} catch (error) {
		//if no more pokemon's from this type exist
		alert(`There are no more Pokemon's from type: ${type}`);
	}
}
