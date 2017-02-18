// p5 Code Starts Here

// DECLARE COUNTERTOP VARIABLES

var board, pan, stove; 


// PRELOAD

function preload(){

	//LOAD COUNTERTOP IMAGES

	pan = loadImage('img/pan.png');
	board = loadImage('img/board.png');
	stove = loadImage('img/stove.png');
	pepper = loadImage('img/pepper.png');

	//LOAD SOUNDS
}


// SETUP

function setup() {
	createCanvas(windowWidth, windowHeight);
	
}

//SIZING

function scaler() {
	boardWidth = windowWidth * .5;
	boardHeight = boardWidth * .61;
	// veggieSize = boardScale*.125;


}

// DRAW

function draw() {
	background('#BCC6CC');

	scaler();

	imageMode(CENTER);


	
	
	image(stove, windowWidth/30, windowHeight/2, 700, 700);
	image(pan, windowWidth/6.5, windowHeight/5*3.6, 270, 420);

	image(board, windowWidth-windowWidth/3, windowHeight-windowHeight*.3, boardWidth, boardHeight);
	image(pepper, windowWidth-windowWidth/3,  windowHeight-windowHeight*.9, boardWidth*.125, boardHeight*.125);

}
	// image(pepper, windowWidth-windowWidth/3,  windowHeight-windowHeight*.9, 500,500);





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