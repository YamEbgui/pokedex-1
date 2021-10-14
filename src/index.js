/** General & Variables **/
const searchButton = document.querySelector(`#search-button`);
const searchInput = document.querySelector(`#search-input`);
const imageElement = document.getElementById(`image`);

let pokemon = null;

/** API & Network**/

//get pokemon data from pokeapi.co
async function getPokemon(name) {
	try {
		return await axios
			.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
			.then((response) => response.data);
	} catch (error) {
		//if pokemon doesn't exist
		alert(`Can't find a Pokemon with this name or ID.\nPlease try again!`);
		throw `Pokemon Not Found`;
	}
}

/**  Event Listeners **/

searchButton.addEventListener(`click`, async () => {
	if (searchInput.value) {
		//check if user entered name/ID
		pokemon = await getPokemon(searchInput.value);
		addPokemonToPage(pokemon);
		searchInput.value = ``;
	} else {
		alert(`Please enter a Pokemon name or ID`);
	}
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
	//get html elements
	const name = document.getElementById('name');
	const height = document.getElementById('height');
	const weight = document.getElementById('weight');
	const image = document.getElementById(`image`);

	//change values
	name.replaceChildren(document.createTextNode(pokemon.name));
	height.replaceChildren(document.createTextNode(pokemon.height));
	weight.replaceChildren(document.createTextNode(pokemon.weight));
	image.setAttribute('src', pokemon.sprites.front_default);
}
