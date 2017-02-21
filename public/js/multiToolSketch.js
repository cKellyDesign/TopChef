$(document).ready(function(){
	window.multiTool = new MultiTool();
	$.shake({  callback : window.multiTool.onShake });
});


var x, y, z;
var accThreshold = 1.25;

var xR, yR, zR;
var rotThreshold = 5;

var toolIsReady = false;
var toolState = {
	'blank' : true,
	'knifeL': false,
	'knifeR': false,
	'spoon' : false,
	'shaker': false,
	'state'	: 'blank',
	'pState': 'blank'
};
var stateThreshold = 0;
var isPro = false; // this could be turned on to enable "blank state" increasing difficulty

var actionLegend = {
	'blank' : '**',
	'knifeL': 'Slice!!',
	'knifeR': 'Dice!!',
	'spoon' : 'Stir!!!',
	'shaker': 'Sprinkle!!',
};

var accCounter = 0;

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
		$('#knife, #spoon, #shaker').on('click', self.onControllerClick);
		// $('#container').append('<h1 id="stateEl">Ready!!</h1>'); // for rendering state stats

		// Subscribe to Motion Events
		$(window).on('deviceorientation', self.onDeviceRotation);
		// $(window).on('devicemotion', self.onDeviceMotion);
	};

	this.init = function () {
		self.reconnectMarkup = $('#container').html();
		$('#container').empty();
		$('body').removeClass('notReady');
		toolIsReady = true;
	}

	this.onControllerClick = function (e) {
		var thisId = $(e.target).attr('id');
		var newState = thisId === 'knife' ? 'knifeR' : thisId;
		// debugger;
		self.setState(newState);

	}

	this.onShake = function () {
		if (!toolIsReady) return;
		// $('#container').prepend('<p class="shake">' + actionLegend[toolState.state] + '</p>');

		
		$('body').addClass('action');

		window.setTimeout(function(){
			$('body').removeClass('action');
			navigator.vibrate(200);
			if (!toolState.blank && self.pin ) {
				self.socket.emit('cooking-action', { 
					type : toolState.state, 
					action : actionLegend[toolState.state] 
				});
			}
		}, 150);
		
	}

	this.onDeviceMotion = function (e) {
		if (!toolIsReady) return;
		var acc = e.originalEvent.accelerationIncludingGravity;

		if (acc.y < -3 ) {
			
			accCounter++;
			if (accCounter === 10) {
				accCounter = 0;
				
				self.socket.emit('cooking-action', { 
					type : 'swipe', 
					action : 'scrape!!' 
				});
			}
		}

		x = acc.x;
		y = acc.y;
		z = acc.z;
		// self.handleAcceleration(acc);
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

		// self.handleRotation(orr);
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
		toolState.pState = toolState.state;
		toolState.state = newState;

		// $('.shake').remove();
		$('body').removeClass(toolState.pState).addClass(toolState.state);
		// if (!!navigator.vibrate) navigator.vibrate(75);
		// self.renderState(newState);
		if (newState === 'knifeR' || newState === 'knifeL') {
			$(window).on('devicemotion', self.onDeviceMotion);
		} else {
			$(window).off('devicemotion', self.onDeviceMotion);
		}
	}

	this.determineState = function (orr) {
		// var newState = toolState.state;
		var newState = '';
		var prevState = toolState.state;
		var knifeYthreshold = 65;
		var XisFlat = (orr.xR < 10 && orr.xR > -10); // away / towards
		var YisFlat = (orr.yR >= -knifeYthreshold && orr.yR <= knifeYthreshold); // left / right


		// Determine newState by Orrientation
		if ( orr.xR < -75 && orr.xR > -105 ) {
			newState = 'shaker';

		} else if ( orr.xR >= -65 && orr.xR < -35 && !(orr.yR < -knifeYthreshold || orr.yR > knifeYthreshold) ) {
			newState = 'spoon';

		} else if ( XisFlat && orr.yR < -knifeYthreshold ) {
			newState = 'knifeR';

		} else if ( XisFlat && orr.yR > knifeYthreshold ) {
			newState = 'knifeL';
			
		} else if ( isPro && XisFlat && YisFlat ) {
			newState = 'blank';
		} 


		// Determine stability of newState
		if (!!newState) {

			if (newState !== prevState) {
				
				stateThreshold++;
				if (stateThreshold > 9) { 
					self.setState(newState); // if a new state is seen 3x then change state
				}

			} else {
				stateThreshold = 0;
			}
			
		// } else {
		// 	self.renderState(toolState.state);
		}
	}

	this.renderState = function (str) {

		$('#stateEl').html(str);

		self.renderStats();
	}

	this.renderStats = function () {

		$('#accStats').remove();
		var accStatsStr = '<p id="accStats"><b>Acceleration</b><br><br>X : ' + x + '<br>' +
							'Y : ' + y + '<br>Z : ' + z + '</p>';
		$('#stateEl').after(accStatsStr);

		$('#orrStats').remove();
		var orrStatsStr = '<p id="orrStats"><b>Orrientation</b><br><br>X : ' + xR + '<br>' +
							'Y : ' + yR + '<br>Z : ' + zR + '</p>';
		$('#stateEl').after(orrStatsStr);
	}

	// initialize IO
	this.socket = io();
	this.pin = 0;
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
			self.pin = payload.pin;
		}
	});
	
	this.socket.on('counter-disconnected', function () {
		location.reload();
	});

}


