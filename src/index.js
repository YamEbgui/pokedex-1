/** General & Variables **/
const searchButton = document.querySelector(`#search-button`);
const searchInput = document.querySelector(`#search-input`);

/** API & Network**/

//get pokemon data from pokeapi.co
async function getPokemon(name) {
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
async function getPokemonsOfType(type) {
	try {
		return await fetch(`https://pokeapi.co/api/v2/type/${type}`)
			.then((response) => response.json())
			.then((data) => data.pokemon);
	} catch (error) {
		//if no more pokemon's from this type exist
		alert(`There are no more Pokemon's from type: ${type}`);
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
function showBackImage(frontImage, backImage) {
	const imageElement = document.getElementById(`image`);

	imageElement.addEventListener(`mouseenter`, () => {
		imageElement.setAttribute(`src`, backImage);
	});

	//change pokemon image to front whn mouse leave
	imageElement.addEventListener(`mouseleave`, () => {
		imageElement.setAttribute(`src`, frontImage);
	});
}

//enables to click on a pokemon type to get a list of more pokemon from the same type
function addEventsToType(typeElement) {
	typeElement.addEventListener(`click`, async () => {
		if (!document.getElementById(`type-list`)) {
			const list = await createPokemonsList(typeElement.innerHTML);
			document.getElementById(`pokemon`).appendChild(list);
		} else {
			const list = await createPokemonsList(typeElement.innerHTML);
			document.getElementById(`type-list`).replaceWith(list); //remove list
		}
	});
}

function showPokemonFromList(pokemonLiElement) {
	pokemonLiElement.addEventListener(`click`, async () => {
		getPokemonInfo(pokemonLiElement.innerText);
	});
}

/** DOM **/

//create a pokemon object
function createPokemon(name, height, weight, types, image) {
	//get html elements
	const nameElement = document.getElementById('name');
	const heightElement = document.getElementById('height');
	const weightElement = document.getElementById('weight');
	const typeElement = document.getElementById(`type`);
	const imageElement = document.getElementById(`image`);

	//set new values
	nameElement.replaceChildren(document.createTextNode(name));
	heightElement.replaceChildren(document.createTextNode(height));
	weightElement.replaceChildren(document.createTextNode(weight));
	imageElement.setAttribute('src', image);

	//handling types
	if (typeElement.innerHTML) {
		typeElement.innerHTML = ``; //reset list content
		for (const type of types) {
			let typeText = document.createElement(`span`);
			typeText.innerHTML = `${type} `;
			addEventsToType(typeText);

			typeElement.appendChild(typeText);
		}
	} else {
		for (const type of types) {
			let typeText = document.createElement(`span`);
			typeText.innerHTML = `${type} `;
			addEventsToType(typeText);

			typeElement.appendChild(typeText);
		}
	}
}

function addPokemonToPage(pokemon) {
	let name = pokemon.name;
	let height = pokemon.height;
	let weight = pokemon.weight;
	let types = [];
	let frontImage = pokemon.sprites.front_default;
	let backImage = pokemon.sprites.back_default;

	//get all the pokemon types
	for (const pokemonType of pokemon.types) {
		types.push(pokemonType.type.name);
	}

	//if a list already exist - remove it
	if (document.getElementById(`type-list`)) {
		removeList(document.getElementById(`type-list`));
	}
	createPokemon(name, height, weight, types, frontImage);

	showBackImage(frontImage, backImage); //show back image of pokemon on mouse enter
}

//create a list of pokemon's
async function createPokemonsList(type) {
	const pokemonListDiv = document.createElement(`div`);
	pokemonListDiv.setAttribute(`id`, `type-list`);
	const pokemonsList = document.createElement(`ul`);
	const pokemonsListObject = await getPokemonsOfType(type);

	//build the list
	for (const pokemon of pokemonsListObject) {
		let pokemonLiElement = document.createElement(`li`);
		pokemonLiElement.innerHTML = pokemon.pokemon.name;
		showPokemonFromList(pokemonLiElement); //add event listener to every pokemon on list
		pokemonsList.appendChild(pokemonLiElement);
	}
	pokemonListDiv.appendChild(pokemonsList);
	return pokemonListDiv;
}

//remove existing list from page
function removeList(list) {
	list.remove();
}

//show new pokemon from the type list
async function getPokemonInfo(pokemonName) {
	const newPokemon = await getPokemon(pokemonName);
	addPokemonToPage(newPokemon);
}
