// p5 Code Starts Here







// p5 Code Ends Here





// Main JS for handling events and telling p5 to do things
function CounterTop () {
	var self = this;

	this.handleSessionStarted = function (payload) {
		console.log('Session Starting: ', payload.pin);
		console.log('Pair your device at http://[YOUR.IP.ADRESS]:8000/multitool.html');
		// console.log('CounterTop Server Socket', payload.socket);
	};

	this.handleCookingAction = function (payload) {
		console.log('COOKING ACTION!!!   ' + payload.action );
	};

	// initialize IO
	this.socket = io();

	// When connected, send dorthy event
	this.socket.on('connect', function() {
		self.socket.emit('counter-top-init');
	});

	// Listeners for update to content
	this.socket.on('session-started', this.handleSessionStarted);
	this.socket.on('tool-connected', function(){
		console.log("TOOL CONNECTED!!!");
	});
	this.socket.on('tool-disconnected', function (payload) {
		console.log("tool disconnected : ", payload.pin);
	});

	this.socket.on('cooking-action', self.handleCookingAction);
}

window.counterTop = new CounterTop();