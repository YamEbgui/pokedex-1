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

export async function catchPokemon(id, username) {
	try {
		const requestCatchPokemon = await axios({
			method: 'PUT',
			url: `http://localhost:8080/pokemon/catch/${id}`,
			data: {},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				user: username,
			},
		});
		console.log(await requestCatchPokemon.json());
	} catch (e) {
		console.log('pokemon already caught');
	}
}

export async function releasePokemon(id, username) {
	try {
		const requestCatchPokemon = await axios({
			method: 'DELETE',
			url: `http://localhost:8080/pokemon/release/${id}`,
			data: {},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				user: username,
			},
		});
		console.log(await requestCatchPokemon.json());
	} catch (e) {
		console.log('pokemon already released');
	}
}
