// p5 Code Starts Here

// DECLARE COUNTERTOP VARIABLES

var board, pan, stove; 
var carrot, cucumber, pepper; 


// PRELOAD

function preload(){

	//LOAD COUNTERTOP IMAGES
	board = loadImage('img/board.svg');
	pan = loadImage('img/pan.svg');
	stove = loadImage('img/stove.svg');
	pepper = loadImage('img/pepper.svg');

	//LOAD SOUNDS
}

// SETUP

function setup() {
	createCanvas(windowWidth, windowHeight);
}

// DRAW

function draw() {
	background('#BCC6CC');

	imageMode(CENTER);
	image(board, windowWidth-windowWidth/3, windowHeight-windowHeight*.3, 551,395);
	image(pepper, windowWidth-windowWidth/3,  windowHeight-windowHeight*.9, 29,28);
}






//RESIZE WINDOW WILL RESET ANIMATION
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// p5 Code Ends Here





// Main JS for handling events and telling p5 to do things
function CounterTop () {
	var self = this;

	this.handleSessionStarted = function (payload) {
		console.log('Session Starting: ', payload.pin)
	}

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
	})
}

window.counterTop = new CounterTop();