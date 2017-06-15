/*
 * Server to communicate with ESP-WROOM-02
 * @author Thais Watanabe
 */

// server configuration
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var mongoose = require('mongoose');
var Task = require('./api/models/appModel');
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

// mongodb settings
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Appdb'); 

app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./api/routes/appRoutes');
routes(app);

app.use(bodyParser.json());

// method to discover if has someone at the sensor
var personData;

app.post('/person', function(req, res) {
	personData = req.body
	//console.log("Received: " + personData.hasSomeone);
	io.emit('personEvent', personData);	
});

// method to receive which product the client is aiming
// TODO
var productData = "product1";

// method to return a text with the selected product
app.get('/whichProduct', function(req, res) {
	console.log("Selected product: " + productData);
	res.end(productData);
	io.emit('productEvent', productData);	
});