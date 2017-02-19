var x, y, z;
var accThreshold = 1.25;

var xR, yR, zR;
var rotThreshold = 5;

var toolIsReady = true;
var toolState = {
	'blank' : true,
	'knifeL': false,
	'knifeR': false,
	'spoon' : false,
	'shaker': false,
	'state'	: 'blank'
};

// Main JS for detecting and sendng events, and telling p5 to do things
function MultiTool () {
	var self = this;
	this.canvas = null;

	this.preInit = function () {
		// $('#checkPin').on('click', function (e) {
		// 	e.preventDefault();
		// 	var pin = $('#prinfield').val();
		// 	self.socket.emit('check-pin', { pin : Number(pin) });
		// });
		$('#container').html('<h1 id="stateEl">Ready!!</h1>'); // todo: remove this line and un-comment above
		self.subscribe();
	};

	this.init = function () {
		self.reconnectMarkup = $('#container').html();
		toolIsReady = true;
		// $('#container').html('<h1 id="stateEl">Ready!!</h1>');
	}

	this.subscribe = function () {
		$(window).on('devicemotion', self.onDeviceMotion);
		$(window).on('deviceorientation', self.onDeviceRotation);
	}


	this.onDeviceMotion = function (e) {
		if (!toolIsReady) return;
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

	this.onDeviceRotation = function (e) {
		if (!toolIsReady) return;
		var orr = { 
			xR : e.originalEvent.beta, // -180 - 180 degrees
			yR : e.originalEvent.gamma, // -90 - 90 degrees
			zR : e.originalEvent.alpha // 0 - 360 degrees
		};

		self.handleRotation(orr);
		self.determineState(orr);

		xR = orr.xR;
		yR = orr.yR;
		zR = orr.zR;
	}

	this.handleRotation = function (orr) {
		// Handle Titling Up and Down
		if ( xR < (orr.xR - rotThreshold) || xR > (orr.xR + rotThreshold) ) {
			if (orr.xR < -5) {
				// console.log('Tilting Away');
			} else if (orr.xR > 5) {
				// console.log('Tilting Toward');
			}
		}

		// Handle Tilting Left and Right
		if ( yR < (orr.yR - rotThreshold) || yR > (orr.yR + rotThreshold) ) {
			if ( orr.yR < -5 ) {
				// console.log('Tilting LEFT');
			} else if ( orr.yR > 5 ){
				// console.log('Tilting Right');
			}
		}

		// Handle Rotating Clockwise and Counter-Clockwise
		if ( orr.zR < (zR - 15) || orr.zR > (zR + 15) ) {
			if ( orr.zR < zR  ) {
				// console.log('Rotating Clockwise');
			} else {
				// console.log('Rotating Counter-Clockwise');
			}
		}
	}


	this.setState = function (newState) {
		toolState[toolState.state] = false;
		toolState[newState] = true;
		toolState.state = newState;

		self.renderState(newState);
	}

	this.determineState = function (orr) {
		// var newState = toolState.state;
		var newState = '';
		var knifeYthreshold = 70;
		var XisFlat = (orr.xR < 10 && orr.xR > -10); // away / towards
		var YisFlat = (orr.yR >= -knifeYthreshold && orr.yR <= knifeYthreshold); // left / right


		
		if ( !toolState.shaker && orr.xR < -75 && orr.xR > -105 ) {
			newState = 'shaker';

		} else if ( !toolState.knifeR && XisFlat && orr.yR < -knifeYthreshold ) {
			newState = 'knifeR';

		} else if ( !toolState.knifeL && XisFlat && orr.yR > knifeYthreshold ) {
			newState = 'knifeL';
			
		} else if ( !toolState.blank && XisFlat && YisFlat ) {
			newState = 'blank';
		} 

		if (!!newState) {
			self.setState(newState);
		} else {
			self.renderState(toolState.state);
		}
	}

	this.renderState = function (str) {
		$('#stateEl').html(str + ' (xR : ' + ~~xR + ')');
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