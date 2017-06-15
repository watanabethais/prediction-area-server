/*
 * Server to communicate with ESP-WROOM-02
 * @author Thais Watanabe
 */

// /////////////////////
// server configuration
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var mongoose = require('mongoose');
var Product = require('./api/models/appModel');
var bodyParser = require('body-parser');

server.listen(3000, '192.168.11.8', function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Server listening on %s:%s...", host, port);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// /////////////////
// mongodb settings
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myappdb'); 

var routes = require('./api/routes/appRoutes');
routes(app);


// //////////////////////////
// has someone at the sensor?
var personData;

app.post('/person', function(req, res) {
	personData = req.body
	//console.log("Received: " + personData.hasSomeone);
	io.emit('personEvent', personData);	
});

// ////////////////
// selected product
var productData = "product1";

app.get('/whichProduct', function(req, res) {
	console.log("Selected product: " + productData);
	res.end(productData);
	io.emit('productEvent', productData);	
});