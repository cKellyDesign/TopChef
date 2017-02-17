// p5 Code Starts Here










// p5 Code Ends Here




// Main JS for detecting and sendng events, and telling p5 to do things
function MultiTool () {
	var self = this;
	

	// initialize IO
	this.socket = io();

	// When connected, send content to server for Dorthy
	this.socket.on('connect', function(){
		self.socket.emit('multi-tool-init');
	});


}

window.multiTool = new MultiTool();