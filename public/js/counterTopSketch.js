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
	panX = stoveWidth * .52;
	panY = stoveHeight * .37;
}

function Chicken() {
	chickenHeight = panHeight * .45;
	chickenWidth = panWidth * .5;
	chickenX = panX;
	chickenY = panY * .7;

}

// DECLARE FOOD 

function Pepper(x, y) {
	pepperWidth = boardWidth * .125;
	pepperHeight = pepperWidth * 1.21;
	pepperX = windowWidth-boardWidth*.5;
	pepperY = windowHeight * .2;
}

function Broccoli() {
	broccoliWidth = boardWidth * .25;
	broccoliHeight = broccoliWidth * 1.09;
	broccoliX = windowWidth-boardWidth*.75;
	broccoliY = windowHeight * .2;
}

function Carrot() {
	carrotWidth = boardWidth * .25;
	carrotHeight = carrotWidth * .65;
	carrotX = windowWidth-boardWidth*.6;
	carrotY = windowHeight * .3;
}

var cucumber, lettuce, mushroom, onion, potato, tomato; 

//Flags that determine if mouse is in the radius of a certain food when pressed
var dragredPepper = false;
var dragBroccoli = false;
var dragCarrot = false;
/*var dragOrangePepper = false;
var dragYellowPepper = false;
var dragCucumber = false;
var dragMushroom = false;
var dragOnion = false;*/

// PRELOAD

function preload(){

	//LOAD COUNTERTOP IMAGES
	pan = loadImage('img/pan.png');
	board = loadImage('img/board.png');
	stove = loadImage('img/stove.png');
	chicken = loadImage('img/chicken.png');

	//LOAD FOOD 
	redPepper = loadImage('img/pepper-r.png');
	orangePepper = loadImage('img/pepper-o.png');
	yellowPepper = loadImage('img/pepper-y.png');
	broccoli = loadImage('img/broccoli.png');
	carrot = loadImage('img/carrot.png');
	cucumber = loadImage('img/cucumber.png');
	mushroom = loadImage('img/mushroom.png');
	onion = loadImage('img/onion.png');

	//LOAD SOUNDS

	cutting = loadSound('sounds/cutting.mp3');
	scrape = loadSound('sounds/scrape.mp3');
	sizzlingLoud = loadSound('sounds/sizzling-loud.mp3');
	sizzlingSoft = loadSound('sounds/sizzling-soft.mp3');
	noise = loadSound('sounds/kitchen-background.mp3');
}


// SETUP

function setup() {
	createCanvas(windowWidth, windowHeight);

	background('#BCC6CC');

	Board();
	Stove();
	Pan();
	Chicken();
	Pepper();
	Broccoli();
	Carrot();


	//DRAW GAME BACKGROUND
	imageMode(CENTER);
	image(stove, stoveWidth * .5,  stoveHeight * .45, stoveWidth, stoveHeight);
	image(pan, panX, panY, panWidth, panHeight);
	image(board, windowWidth-boardWidth*.5, windowHeight-boardHeight*.55, boardWidth, boardHeight);
	image(chicken, chickenX, chickenY, chickenWidth,chickenHeight);
	image(redPepper, pepperX, pepperY, pepperWidth, pepperHeight);
	image(broccoli, broccoliX, broccoliY, broccoliWidth, broccoliHeight);
	image(carrot, carrotX, carrotY, carrotWidth, carrotHeight);
	
	// noise.loop();
	
}



// DRAW

function draw() {
	clear();
	imageMode(CENTER);
	image(stove, stoveWidth * .5,  stoveHeight * .45, stoveWidth, stoveHeight);
	image(pan, panX, panY, panWidth, panHeight);
	image(board, windowWidth-boardWidth*.5, windowHeight-boardHeight*.55, boardWidth, boardHeight);
	image(chicken, chickenX, chickenY, chickenWidth,chickenHeight);
	image(redPepper, pepperX, pepperY, pepperWidth, pepperHeight);
	image(broccoli, broccoliX, broccoliY, broccoliWidth, broccoliHeight);
	image(carrot, carrotX, carrotY, carrotWidth, carrotHeight);
}


//RESIZE WINDOW WILL RESET ANIMATION
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//MOUSE PRESS FOR DRAGGING. IF MOUSE IS WITHIN THE CIRCLE WITH A RADIUS OF 0.5 WIDTH OF THE FOOD, THE FLAG WILL BE TRUE 
function mousePressed(){
	if (dist(mouseX, mouseY, pepperX, pepperY) < pepperWidth * .5){
		dragredPepper = true; 
	}
	if (dist(mouseX, mouseY, broccoliX, broccoliY) < broccoliWidth * .5){
		dragBroccoli = true;
	}
	if (dist(mouseX, mouseY, carrotX, carrotY) < carrotWidth * .5){
		dragCarrot = true;
	}
	/*if (dist(mouseX, mouseY, yellowPepperX, yellowPepperY) < yellowPepperWidth * .5){
		dragYellowPepper = true;
	}
	if (dist(mouseX, mouseY, orangePepperX, orangePepperY) < orangePepperWidth * .5){
		dragOrangePepper = true;
	}
	if (dist(mouseX, mouseY, mushroomX, mushroomY) < mushroomWidth * .5){
		dragMushroom = true; 
	}
	if (dist(mouseX, mouseY, cucumberX, cucumberY) < cucumberWidth * .5){
		dragCucumber = true;
	}
	if (dist(mouseX, mouseY, onionX, onionY) < onionWidth * .5){
		dragOnion = true;
	}*/

}


//DRAGGING FOOD EVENT 
function mouseDragged(){
	if(dragCarrot == true){
		carrotX = mouseX;
		carrotY = mouseY;
	}
	if(dragBroccoli == true){
		broccoliX = mouseX;
		broccoliY = mouseY;
	}
	if(dragredPepper == true){
		pepperX = mouseX;
		pepperY = mouseY;
	}
	/*if (dragOnion == true){
		onionX = mouseX;
		onionY = mouseY;
	}
	if(dragMushroom == true){
		mushroomX = mouseX;
		mushroomY = mouseY;
	}
	if(dragCucumber == true){
		cucumberX = mouseX;
		cucumberY = mouseY;
	}
	if(dragYellowPepper == true){
		yellowPepperX = mouseX;
		yellowPepperY = mouseY;
	}
	if(dragOrangePepper == true){
		orangePepperX = mouseX;
		orangePepperY = mouseY;
	}*/

}


//DROPPING FOOD WHEN MOUSE IS RELEASED. FLAG SWITCH TO FALSE.
function mouseReleased(){
	dragredPepper = false;
	dragBroccoli = false;
	dragCarrot = false;
	/*dragOrangePepper = false;
	dragYellowPepper = false;
	dragCucumber = false;
	dragMushroom = false;
	dragOnion = false;*/
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