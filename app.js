const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser());

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

//Assignment4 --with pug files

app.get('/myName', (req, res) => {
	const username = req.cookies.name;
	if (username) {
		res.render('index', { name:username });
	} else {
		res.redirect('/trackName');
	}
});

// app.get('/trackName', (req, res) => {
// 	res.render('trackname', { name: req.cookies.username }); 
// });         --in tutorial video, name and username is reversed

app.get('/trackName', (req, res) => {
	const username = req.cookies.name;
	if (username) {
		res.redirect('/myName');
	} else {
		res.render('trackname');
	}
});

// app.all('/trackName', (req, res) => {
//     console.log(req.body)
//     res.render('trackname', { name: req.body.username });
// });           --didnot use bodyparser and add this code

// app.post('/trackName', (req, res) => {
// 	res.cookie('username', req.body.username);
// 	console.log(req.body);    --will log the input name in terminal
// 	res.render('trackname', { name: req.body.username });
// });

app.post('/trackName', (req, res) => {
	res.cookie('name', req.body.name);
	res.redirect('/myName');
});

app.post('/reset', (req, res) => {
	res.clearCookie('name');
	res.redirect('/trackName');
});


app.listen(3000, () => {
	console.log('the app is running on localhost:3000');
});