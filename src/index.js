/** General & Variables **/
const searchButton = document.querySelector(`#search-button`);
const searchInput = document.querySelector(`#search-input`);
const imageElement = document.getElementById(`image`);

let pokemon = null;

/** API & Network**/

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

/**  Event Listeners **/

searchButton.addEventListener(`click`, async () => {
	pokemon = await getPokemon(searchInput.value);
	addPokemonToPage(pokemon);
});

//change pokemon image to back on mouse over
imageElement.addEventListener(`mouseenter`, () => {
	imageElement.setAttribute(`src`, pokemon.sprites.back_default);
});

//change pokemon image to front whn mouse leave
imageElement.addEventListener(`mouseleave`, () => {
	imageElement.setAttribute(`src`, pokemon.sprites.front_default);
});

/** DOM **/

function addPokemonToPage(pokemon) {
	const name = document.getElementById('name');
	const height = document.getElementById('height');
	const weight = document.getElementById('weight');
	const image = document.getElementById(`image`);

	name.replaceChildren(document.createTextNode(pokemon.name));
	height.replaceChildren(document.createTextNode(pokemon.height));
	weight.replaceChildren(document.createTextNode(pokemon.weight));
	image.setAttribute('src', pokemon.sprites.front_default);
}
