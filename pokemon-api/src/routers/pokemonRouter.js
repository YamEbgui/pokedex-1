const { query } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const userRelativePath = './src/user';

const Pokedex = require('pokedex-promise-v2');
const errorHandler = require('../middleware/errorHandler');
const P = new Pokedex();

router.get('/', async function (req, res) {
	const userName = req.headers.user;
	const filesList = fs.readdirSync(`${userRelativePath}/${userName}`);
	const filesObj = {
		files: filesList,
	};
	res.send(filesObj);
});

router.get('/get/:id', async function (req, res) {
	try {
		const { id } = req.params;
		const pokemonData = await returnPokemon(id);
		res.send(pokemonData);
	} catch {
		errorHandler(404, res);
	}
});

router.get('/:query', async function (req, res) {
	try {
		const { query } = req.params;
		const pokemonData = await returnPokemon(query);
		res.send(pokemonData);
	} catch {
		errorHandler(404, res);
	}
});

router.put('/catch/:id', async function (req, res) {
	try {
		const { id } = req.params;
		const userName = req.headers.user;
		const pokemonData = await returnPokemon(id);
		if (!checkPokemonExist(userName, id)) {
			fs.writeFileSync(
				`${userRelativePath}/${userName}/${id}.js`,
				JSON.stringify(pokemonData)
			); //create file for pokemon
		}
		res.send();
	} catch {
		errorHandler(404, res);
	}
});

router.delete('/release/:id', async function (req, res) {
	try {
		const { id } = req.params;
		const userName = req.headers.user;
		const pokemonData = await returnPokemon(id);
		if (checkPokemonExist(userName, id)) {
			fs.unlinkSync(`${userRelativePath}/${userName}/${id}.js`); //delete file of pokemon
		} else {
			throw 'there is no pokemon';
		}
		res.send();
	} catch {
		errorHandler(403, res);
	}
});

const returnData = (data) => {
	const pokemonResponse = {
		name: data.name,
		height: data.height,
		weight: data.weight,
		types: data.types,
		front_pic: data.sprites.front_default,
		back_pic: data.sprites.back_default,
		abilities: data.abilities,
	};
	return pokemonResponse;
};

const returnPokemon = async (id) => {
	return await P.getPokemonByName(id) // with Promise
		.then(function (response) {
			return returnData(response);
		})
		.catch(function (error) {
			throw ('There was an ERROR: ', error);
		});
};

const isUserExist = (user) => {
	const usersName = fs.readdirSync(userRelativePath);
	for (let i = 0; i < usersName.length; i++) {
		if (usersName[i] === user) {
			return true;
		}
	}
	return false;
};

const checkPokemonExist = (user, id) => {
	const userPokemons = fs.readdirSync(`${userRelativePath}/${user}`);
	for (let i = 0; i < userPokemons.length; i++) {
		if (userPokemons[i] === `${id}.js`) {
			return true;
		}
	}
	return false;
};
module.exports = router;
