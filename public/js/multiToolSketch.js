var x, y, z;
var accThreshold = 1.25;


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
		self.subscribe();
	};

	this.init = function () {
		self.reconnectMarkup = $('#container').html();
		// $('#container').html('<h1>Connected!!</h1>');
	}

	this.subscribe = function () {
		$(window).on('devicemotion', self.onDeviceMotion);
	}

	this.onDeviceMotion = function (e) {
		var acc = e.originalEvent.accelerationIncludingGravity;

		self.handleAcceleration(acc);

		x = acc.x;
		y = acc.y;
		z = acc.z;
	}

	this.handleAcceleration = function (acc) {
		// Handle Left / Right Movement
		if (acc.x < (x - accThreshold) || acc.x > (x + accThreshold) ) {
			if (acc.x > 0) {
				// console.log('Right Acceleration');
			} else {
				// console.log('Left Acceleration');
			}
		}


		// Handle Forward / Backward Movement
		if (acc.y < (y - accThreshold) || acc.y > (y + accThreshold) ) {
			if (acc.y > 0) {
				// console.log('Forward Acceleration');
			} else {
				// console.log('Backward Acceleration');
			}
		}


		// Handle Up / Down Movement
		if (acc.z < (z - accThreshold) || acc.z > (z + accThreshold) ) {
			if (acc.z > z) {
				// console.log('Up Acceleration');
			} else {
				// console.log('Down Acceleration');
			}
		}
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