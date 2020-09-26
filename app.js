const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.send('Hello, My Server!');
});

//Assignment 2: Build Backend API for Front-End

// app.get('/getData', (req, res) => {
// 	res.send('Lack of Parameter');
// });

app.get('/getData', (req, res) => {
	var result;
	if ( req.query.number == undefined ) {
		result = 'Lack of Parameter';
	} else if ( isNaN(req.query.number) ) {
		result = 'Wrong Parameter';
	  } else {
		result = ((1 + Number(req.query.number)) *Number(req.query.number))/2;
	    }
	res.send(`${result}`);
});

app.listen(3000, () => {
	console.log('the app is running on localhost:3000');
});