// p5 Code Starts Here










// p5 Code Ends Here





// Main JS for handling events and telling p5 to do things
function CounterTop () {
	var self = this;


	// initialize IO
	this.socket = io();


	// When connected, send dorthy event
	this.socket.on('connect', function() {
		self.socket.emit('counter-top-init');
	});

	// Listeners for update to content
}

window.counterTop = new CounterTop();