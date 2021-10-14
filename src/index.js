const searchButton = document.querySelector(`#search-button`);
const searchInput = document.querySelector(`#search-input`);

//get pokemon data from pokeapi.co
async function getPokemon(name) {
	try {
		return axios
			.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
			.then((response) => response.data);
	} catch {
		alert(error);
	}
}

/**  event listeners **/
searchButton.addEventListener(`click`, () => {
	getPokemon(searchInput.value).then((pokemon) => {
		addPokemonToPage(pokemon);
	});
});

/** DOM **/

function addPokemonToPage(pokemon) {
	console.log(pokemon);
	const pokemonDiv = document.getElementById('pokemon');

	const name = document.getElementById('name');
	const height = document.getElementById('height');
	const weight = document.getElementById('weight');
	const image = document.getElementById(`image`);

	name.appendChild(document.createTextNode(pokemon.name));
	height.appendChild(document.createTextNode(pokemon.height));
	weight.appendChild(document.createTextNode(pokemon.weight));
	image.setAttribute('src', pokemon.sprites.front_default);
}
