var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();

// Static Express Server Settings
app.set('case sensitive routing', false);
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

	// Listen for disconnection from either Chef or Tool
	socket.once('disconnect', function() {

		var oldChef, oldTool;

		// If CounterTop is disconnected, refresh MultiTool
		if (this.connectionType === 'chef') {

			oldChef = _.findWhere(counterTops, { id : this.id });
			oldTool = _.findWhere(multiTools, { pin : oldChef && oldChef.pin });

			if (oldTool && oldTool.multiToolSocket) {
				oldTool.multiToolSocket.emit('counter-disconnected');
			}

			counterTops.splice(counterTops.indexOf(oldChef), 1);


		// If paired MultiTool is disconnected, alert CounterTop to re-pair
		} else if (this.connectionType === 'tool') {

			oldTool = _.findWhere(multiTools, { id : this.id });
			oldChef = _.findWhere(counterTops, { pin : oldTool && oldTool.pin });

			if (oldChef && oldChef.counterTopSocket) {
				oldChef.counterTopSocket.emit('tool-disconnected', { pin : oldChef.pin});
				oldChef.multiToolSocket = null;
			}

			multiTools.splice(multiTools.indexOf(oldTool), 1);		

		// If unpaired MultiTool is disconnected
		} else {
			oldTool = _.findWhere(multiTools, { id : this.id });
			multiTools.splice(multiTools.indexOf(oldTool), 1);
		}

		socket.disconnect();
	})

	/// Listen for new CounterTop
	socket.on('counter-top-init', function () {
		this.connectionType = 'chef';
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
		this.connectionType = 'tool';
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