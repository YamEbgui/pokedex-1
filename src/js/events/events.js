import * as networking from '../networking/networking';
import * as DOM from '../DOM/DOM';

/** General & Variables **/
const searchInput = document.querySelector(`#search-input`);
const usernameButtonInput = document.querySelector(`#username-button`);

/**  Event Listeners **/

document.addEventListener('submit', async () => {
	event.preventDefault();
	if (searchInput.value) {
		//check if user entered name/ID
		const username = localStorage.getItem('username');
		let pokemon = await networking.getPokemon(searchInput.value, username);
		DOM.addPokemonToPage(pokemon.data);
		searchInput.value = ``;
	} else {
		alert(`Please enter a Pokemon name or ID`);
	}
});

//change pokemon image to back on mouse over
export function showBackImage(frontImage, backImage) {
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
export function addEventsToType(typeElement) {
	typeElement.addEventListener(`click`, async () => {
		if (!document.getElementById(`type-list`)) {
			const list = await DOM.createPokemonsList(typeElement.innerHTML);
			document.getElementById(`pokemon`).appendChild(list);
		} else {
			const list = await DOM.createPokemonsList(typeElement.innerHTML);
			document.getElementById(`type-list`).replaceWith(list); //remove list
		}
	});
}

export function showPokemonFromList(pokemonLiElement) {
	pokemonLiElement.addEventListener(`click`, async () => {
		DOM.getPokemonInfo(pokemonLiElement.innerText);
	});
}

export function showUserInput(button) {
	button.value = 'change user';
	button.addEventListener('click', function changeUser() {
		document.getElementById('username').style.display = 'block';

		DOM.checkUserStatus();

		document.removeEventListener('click', changeUser);
		hideUserInput(button);
	});
}

export function hideUserInput(button) {
	const usernameInput = document.querySelector('#username-input');
	button.value = 'submit';
	button.addEventListener('click', function addUser() {
		if (usernameInput.value) {
			document.getElementById('username').style.display = 'none';
			localStorage.setItem('username', usernameInput.value);

			DOM.checkUserStatus();

			document.removeEventListener('click', addUser);
			showUserInput(button);
		} else {
			alert('Please enter a valid username');
		}
	});
}

document.getElementById('catch').addEventListener('click', () => {
	const username = localStorage.getItem('username');
	const id = document.getElementById('id').innerText;
	networking.catchPokemon(id, username);
});

document.getElementById('release').addEventListener('click', () => {
	const username = localStorage.getItem('username');
	const id = document.getElementById('id').innerText;
	networking.releasePokemon(id, username);
});

document
	.getElementById('user-pokemons-button')
	.addEventListener('click', async () => {
		const username = localStorage.getItem('username');
		const list = await networking.userPokemons(username);

		if (!document.getElementById(`user-pokemon-list`)) {
			DOM.userPokemonsList(list);
		} else {
			document
				.getElementById(`user-pokemons`)
				.removeChild(document.getElementById(`user-pokemon-list`)); //remove list
		}
	});
