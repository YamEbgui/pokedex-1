const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const { title } = require('process');
module.exports = {
	mode: `production`, //development
	entry: {
		main: path.resolve(__dirname, `src/js/index.js`),
	},
	output: {
		path: path.resolve(__dirname, `dist`),
		filename: `[name].js`,
		clean: true,
	},

	//loaders
	module: {
		rules: [{ test: /\.css$/, use: [`style-loader`, `css-loader`] }],
	},

	//plugins
	plugins: [
		new HtmlWebpackPlugin({
			title: `Pokedex`,
			filename: `index.html`,
			template: path.resolve(__dirname, `./src/template.html`),
		}),
	],
};
