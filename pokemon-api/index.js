const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const port = 8080;
const pokemonRouter = require('./src/routers/pokemonRouter');
const userRouter = require('./src/routers/userRouter');
const userHandler = require('./src/middleware/userHandler');
const errorHandler = require('./src/middleware/errorHandler');

app.use((req, res, next) => {
	res.append('Access-Control-Allow-Methods', '*');
	res.append('Access-Control-Allow-Headers', '*');
	next();
});

app.use(userHandler);
app.use('/pokemon', pokemonRouter);
app.use('/info', userRouter);
app.use('/', (req, res) => {
	errorHandler(500, res);
});

app.listen(port, function () {
	console.log('app started');
});

app.get('/', function (req, res) {
	res.send('hello world!');
});
