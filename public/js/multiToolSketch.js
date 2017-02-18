

function setup () {
	var cc = createCanvas(windowWidth, windowHeight);
	cc.parent('p5Container');
	console.log('setup!');
	frameRate(2);
};

function draw () {
	// console.log('X Rotation', )
};


// p5 Code Ends Here




// Main JS for detecting and sendng events, and telling p5 to do things
function MultiTool () {
	var self = this;
	this.canvas = null;

	this.preInit = function () {
		$('#checkPin').on('click', function (e) {
			e.preventDefault();
			var pin = $('#prinfield').val();
			self.socket.emit('check-pin', { pin : Number(pin) });
		});

	};

	this.init = function () {
		self.reconnectMarkup = $('#container').html();
		// $('#container').html('<h1>Connected!!</h1>');
		// window.canvas = new p5(Canvas);
	}

	this.subscribe = function () {

	}

	// initialize IO
	this.socket = io();

	// When connected, send content to server for Dorthy
	this.socket.on('connect', this.preInit);
	this.socket.once('pin-checked', function (payload) {
		
		if (!payload.bool) {
			alert("No Matching Pin: ", $('#prinfield').val());
			self.socket.on('connect', self.preInit);
		} else {
			console.log('Matching pin - ', payload.pin);
			self.socket.emit('multi-tool-init', { pin : payload.pin });
			self.init();
		}
	});
	
	this.socket.on('counter-disconnected', function () {
		location.reload();
	});

}

window.multiTool = new MultiTool();