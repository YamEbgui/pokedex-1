/** API & Network**/

//get pokemon data from pokeapi.co
export async function getPokemon(name) {
	try {
		return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
			(response) => response.json()
		);
	} catch (error) {
		//if pokemon doesn't exist
		alert(`Can't find a Pokemon with this name or ID.\nPlease try again!`);
		throw `Pokemon Not Found`;
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
