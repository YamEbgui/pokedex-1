import * as events from '../events/events';
import * as networking from '../networking/networking';
import * as style from './style';

/** DOM **/
style.searchBar();

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
	style.imageStyle();

	//handling types
	if (typeElement.innerHTML) {
		typeElement.innerHTML = ``; //reset list content
		for (const type of types) {
			let typeText = document.createElement(`span`);
			typeText.setAttribute('id', type);
			typeText.innerHTML = `${type} `;
			events.addEventsToType(typeText);
			typeElement.appendChild(typeText);
		}
	} else {
		for (const type of types) {
			let typeText = document.createElement(`span`);
			typeText.setAttribute('id', type);
			typeText.innerText = `${type} `;
			events.addEventsToType(typeText);
			typeElement.appendChild(typeText);
		}
	}
}

export function addPokemonToPage(pokemon) {
	let name = pokemon.name;
	let height = pokemon.height;
	let weight = pokemon.weight;
	let types = [];
	let frontImage = pokemon.front_default;
	let backImage = pokemon.back_default;

	//get all the pokemon types
	for (const pokemonType of pokemon.types) {
		types.push(pokemonType.type.name);
	}
	//if a list already exist - remove it
	if (document.getElementById(`type-list`)) {
		removeList(document.getElementById(`type-list`));
	}
	createPokemon(name, height, weight, types, frontImage);

	events.showBackImage(frontImage, backImage); //show back image of pokemon on mouse enter
}

//create a list of pokemon's
export async function createPokemonsList(type) {
	const pokemonsList = document.createElement(`un`);
	pokemonsList.setAttribute(`id`, `type-list`);
	const pokemonsListObject = await networking.getPokemonsOfType(type);

	//build the list
	for (const pokemon of pokemonsListObject) {
		let pokemonLiElement = document.createElement(`li`);
		pokemonLiElement.innerHTML = pokemon.pokemon.name;
		events.showPokemonFromList(pokemonLiElement); //add event listener to every pokemon on list
		pokemonsList.appendChild(pokemonLiElement);
	}
	for (const poke of pokemonsList.children) {
		poke.setAttribute('class', 'dropdown-item');
	}
	return pokemonsList;
}

//remove existing list from page
function removeList(list) {
	list.remove();
}

//show new pokemon from the type list
export async function getPokemonInfo(pokemonName) {
	const username = localStorage.getItem('username');
	const newPokemon = await networking.getPokemon(pokemonName, username);
	addPokemonToPage(newPokemon.data);
}
