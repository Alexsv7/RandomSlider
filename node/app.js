var randomNumber = require('./random.js');
var express = require('express');
var app = express();
//set the port from environmental variable, else set 1337 port
var port = process.env.PORT || 1337;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/api', function(req,res){
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ number: randomNumber(1, 11) });
});

app.listen(port);