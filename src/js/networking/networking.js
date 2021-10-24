/** API & Network**/
const axios = require('axios');

//get pokemon data from pokeapi.co
export async function getPokemon(pokemonName, username) {
	const config = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			user: `${username}`,
		},
		params: { name: pokemonName },
	};
	if (parseInt(pokemonName)) {
		return await axios.get(
			`http://localhost:8080/pokemon/get/${pokemonName}`,
			config
		);
	} else {
		return await axios.get(`http://localhost:8080/pokemon/query`, config);
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
