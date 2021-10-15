(() => {
	'use strict';
	async function e(e) {
		try {
			return await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`).then((e) =>
				e.json()
			);
		} catch (e) {
			throw (
				(alert("Can't find a Pokemon with this name or ID.\nPlease try again!"),
				'Pokemon Not Found')
			);
		}
	}
	function t(e) {
		let t = e.name,
			n = e.height,
			o = e.weight,
			c = [],
			i = e.sprites.front_default,
			r = e.sprites.back_default;
		for (const t of e.types) c.push(t.type.name);
		document.getElementById('type-list') &&
			document.getElementById('type-list').remove(),
			(function (e, t, n, o, c) {
				const i = document.getElementById('name'),
					r = document.getElementById('height'),
					d = document.getElementById('weight'),
					s = document.getElementById('type'),
					m = document.getElementById('image');
				if (
					(i.replaceChildren(document.createTextNode(e)),
					r.replaceChildren(document.createTextNode(t)),
					d.replaceChildren(document.createTextNode(n)),
					m.setAttribute('src', c),
					s.innerHTML)
				) {
					s.innerHTML = '';
					for (const e of o) {
						let t = document.createElement('span');
						(t.innerHTML = `${e} `), a(t), s.appendChild(t);
					}
				} else
					for (const e of o) {
						let t = document.createElement('span');
						(t.innerHTML = `${e} `), a(t), s.appendChild(t);
					}
			})(t, n, o, c, i),
			(function (e, t) {
				const n = document.getElementById('image');
				n.addEventListener('mouseenter', () => {
					n.setAttribute('src', t);
				}),
					n.addEventListener('mouseleave', () => {
						n.setAttribute('src', e);
					});
			})(i, r);
	}
	async function n(e) {
		const t = document.createElement('div');
		t.setAttribute('id', 'type-list');
		const n = document.createElement('ul'),
			o = await (async function (e) {
				try {
					return await fetch(`https://pokeapi.co/api/v2/type/${e}`)
						.then((e) => e.json())
						.then((e) => e.pokemon);
				} catch (t) {
					alert(`There are no more Pokemon's from type: ${e}`);
				}
			})(e);
		for (const e of o) {
			let t = document.createElement('li');
			(t.innerHTML = e.pokemon.name), i(t), n.appendChild(t);
		}
		return t.appendChild(n), t;
	}
	const o = document.querySelector('#search-button'),
		c = document.querySelector('#search-input');
	function a(e) {
		e.addEventListener('click', async () => {
			if (document.getElementById('type-list')) {
				const t = await n(e.innerHTML);
				document.getElementById('type-list').replaceWith(t);
			} else {
				const t = await n(e.innerHTML);
				document.getElementById('pokemon').appendChild(t);
			}
		});
	}
	function i(n) {
		n.addEventListener('click', async () => {
			!(async function (n) {
				t(await e(n));
			})(n.innerText);
		});
	}
	o.addEventListener('click', async () => {
		c.value
			? (t(await e(c.value)), (c.value = ''))
			: alert('Please enter a Pokemon name or ID');
	});
})();
