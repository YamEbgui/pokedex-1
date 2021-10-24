import * as events from '../events/events';
import * as networking from '../networking/networking';
import * as style from './style';

/** DOM **/
style.searchBar();

//create a pokemon object
function createPokemon(id, name, height, weight, types, image) {
	//get html elements
	const idElement = document.getElementById('id');
	const nameElement = document.getElementById('name');
	const heightElement = document.getElementById('height');
	const weightElement = document.getElementById('weight');
	const typeElement = document.getElementById(`type`);
	const imageElement = document.getElementById(`image`);

	//set new values
	idElement.replaceChildren(document.createTextNode(id));
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
	let id = pokemon.id;
	let name = pokemon.name;
	let height = pokemon.height;
	let weight = pokemon.weight;
	let types = [];
	let frontImage = pokemon.front_pic;
	let backImage = pokemon.back_pic;

	//get all the pokemon types
	for (const pokemonType of pokemon.types) {
		types.push(pokemonType.type.name);
	}
	//if a list already exist - remove it
	if (document.getElementById(`type-list`)) {
		removeList(document.getElementById(`type-list`));
	}
	createPokemon(id, name, height, weight, types, frontImage);

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

export function checkUserStatus() {
	const usernameButton = document.querySelector('#username-button');
	//username exist

	if (localStorage.getItem('username') != null) {
		usernameButton.value = 'change user';
		events.showUserInput(usernameButton);
	} else {
		document.querySelector('#username').style.display = 'block';
		usernameButton.value = 'submit';
		events.hideUserInput(usernameButton);
	}
}

export function userPokemonsList(list) {
	const listDiv = document.getElementById('user-pokemons');
	const listUlElement = document.createElement('ul');
	listUlElement.setAttribute('id','user-pokemon-list')

	for (const pokemonFile of list.files) {
		const listElement = document.createElement('li')
		listElement.innerText = pokemonFile.split('.').slice(0, -1).join('.')
		listElement.setAttribute('class', 'dropdown-item');
		listUlElement.appendChild(listElement)
	}

	listDiv.appendChild(listUlElement)
}

checkUserStatus();
