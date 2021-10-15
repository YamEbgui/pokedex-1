import * as networking from '../networking/networking';
import * as DOM from '../DOM/DOM';

/** General & Variables **/
const searchButton = document.querySelector(`#search-button`);
const searchInput = document.querySelector(`#search-input`);

/**  Event Listeners **/

searchButton.addEventListener(`click`, async () => {
	if (searchInput.value) {
		//check if user entered name/ID
		let pokemon = await networking.getPokemon(searchInput.value);
		DOM.addPokemonToPage(pokemon);
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
