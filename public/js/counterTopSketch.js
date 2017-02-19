// p5 Code Starts Here

// DECLARE COUNTERTOP VARIABLES

function Board() {
	boardWidth = windowWidth * .5;
	boardHeight = boardWidth * .61;
}

function Stove() {
	stoveWidth = windowWidth * .4;
	stoveHeight = stoveWidth * 1.56; 	
}



function Pan() {
	panHeight = stoveHeight * .65;
	panWidth = stoveWidth * .65; 
}


// DECLARE FOOD 

var pepper, broccoli, carrot, cucumber, lettuce, mushroom, onion, potato, tomato; 


// PRELOAD

function preload(){

	//LOAD COUNTERTOP IMAGES
	pan = loadImage('img/pan.png');
	board = loadImage('img/board.png');
	stove = loadImage('img/stove.png');
	chicken = loadImage('img/chicken.png');

	//LOAD FOOD 
	pepper = loadImage('img/pepper.png');
	broccoli = loadImage('img/broccoli.png');
	carrot = loadImage('img/carrot.png');
	cucumber = loadImage('img/cucumber.png');
	lettuce = loadImage('img/lettuce.png');
	mushroom = loadImage('img/mushroom.png');
	onion = loadImage('img/onion.png');
	potato = loadImage('img/potato.png');
	tomato = loadImage('img/tomato.png');

	//LOAD SOUNDS
}


// SETUP

function setup() {
	createCanvas(windowWidth, windowHeight);
	
}



// DRAW

function draw() {
	background('#BCC6CC');

	Board();
	Stove();
	Pan();

	

	//DRAW GAME BACKGROUND
	imageMode(CENTER);
	image(stove, stoveWidth * .5,  stoveHeight * .48, stoveWidth, stoveHeight);
	image(pan, stoveWidth * .52, stoveHeight * .37, panWidth, panHeight);
	image(board, windowWidth-boardWidth*.5, windowHeight-boardHeight*.55, boardWidth, boardHeight);
	

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