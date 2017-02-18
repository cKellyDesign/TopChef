var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();

// Static Express Server Settings
app.use(express.static('./public'));
app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/mulitool', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'multiTool.html'));
});

// start up the server on port 3000
var server = app.listen(process.env.PORT || 8000, function() {
	console.log('Express Server running on port %s', this.address().port);
});


var counterTops = [];
var multiTools = [];



// Init IO
var io = require('socket.io').listen(server);

// Listen for connection before assigning listeners
io.sockets.on('connection', function (socket) {

	// Listen for disconnection from either Oz or Dorthy
	socket.once('disconnect', function() {


		// var oldChef = _.findWhere(counterTops, { id : this.id });
		// if (oldChef) {

		// }

		// var oldTool 


		socket.disconnect();
	})

	/// Listen for new CounterTop
	socket.on('counter-top-init', function () {
		var newChef = {
			id: this.id,
			pin: (Math.floor(Math.random()*90000) + 10000),
			multiToolSocket: null,
			counterTopSocket: this
		}

		counterTops.push(newChef);
		this.emit('session-started', { pin : newChef.pin });
	});

	// Listen for new MultiTool
	socket.on('check-pin', function (payload) {
		var isMatch = _.findWhere(counterTops, { pin : payload.pin });
		this.emit('pin-checked', { bool : !!isMatch, pin : payload.pin });
	});

	socket.on('multi-tool-init', function (payload) {
		 console.log('new MultiTool -', payload.pin);
			var chef = _.findWhere(counterTops, { pin : payload.pin });

			var newTool = {
				id: this.id,
				pin: payload.pin,
				multiToolSocket: this,
				counterTopSocket: chef.counterTopSocket
			};

			multiTools.push(newTool);
			this.emit('session-started');
			newTool.counterTopSocket.emit('tool-connected');
	});

});