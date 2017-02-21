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
	pepperWidth = boardWidth * .09;
	pepperHeight = pepperWidth * 1.21;
	pepperX = windowWidth-boardWidth*.5;
	pepperY = windowHeight * .2;

	pepperSliceHeight = pepperHeight;
	pepperSliceWidth = pepperSliceHeight * .5;

	chopState.redPepper.choppedW = pepperSliceWidth;
	chopState.redPepper.choppedH = pepperSliceHeight;
}

function Broccoli() {
	broccoliWidth = boardWidth * .19;
	broccoliHeight = broccoliWidth * 1.09;
	broccoliX = windowWidth-boardWidth*.75;
	broccoliY = windowHeight * .2;

	broccoliSliceHeight = broccoliHeight * .5;
	broccoliSliceWidth = broccoliSliceHeight * .56;

	chopState.broccoli.choppedW = broccoliSliceWidth;
	chopState.broccoli.choppedH = broccoliSliceHeight;
}

function Carrot() {
	carrotWidth = boardWidth * .25;
	carrotHeight = carrotWidth * .65;
	carrotX = windowWidth-boardWidth*.6;
	carrotY = windowHeight * .3;

	carrotSliceHeight = carrotHeight * .5;
	carrotSliceWidth = carrotSliceHeight;

	chopState.carrot.choppedW = carrotSliceWidth;
	chopState.carrot.choppedH = carrotSliceHeight;
}

function Cucumber () {
	cucumberWidth = boardWidth * .25;
	cucumberHeight = cucumberWidth * .42;
	cucumberX = windowWidth-boardWidth;
	cucumberY = windowHeight * .3;

	cucumberSliceHeight = cucumberHeight * .5;
	cucumberSliceWidth = cucumberSliceHeight;

	chopState.cucumber.choppedW = cucumberSliceWidth;
	chopState.cucumber.choppedH = cucumberSliceHeight;
}

function Mushroom () {
	mushroomWidth = boardWidth * .06;
	mushroomHeight = mushroomWidth * .96;
	mushroomX = windowWidth-boardWidth;
	mushroomY = windowHeight * .2;

	mushroomSliceHeight = mushroomHeight * .5;
	mushroomSliceWidth = mushroomSliceHeight;

	chopState.mushroom.choppedW = mushroomSliceWidth;
	chopState.mushroom.choppedH = mushroomSliceHeight;
}

function Onion () {
	onionWidth = boardWidth * .1;
	onionHeight = onionWidth * 1.24;
	onionX = windowWidth-boardWidth;
	onionY = windowHeight * .1;

	onionSliceHeight = onionHeight * .5;
	onionSliceWidth = onionSliceHeight;

	chopState.onion.choppedW = onionSliceWidth;
	chopState.onion.choppedH = onionSliceHeight;
}




//Flags that determine if mouse is in the radius of a certain food when pressed
var dragredPepper = false;
var dragBroccoli = false;
var dragCarrot = false;
var dragCucumber = false;
var dragOrangePepper = false;
var dragYellowPepper = false;
var dragMushroom = false;
var dragOnion = false;


var boardState = {
	veggieOnBoard : '',
	redPepper : false,
	broccoli : false,
	carrot : false,
	cucumber : false, 
	mushroom : false, 
	onion : false, 
};

var choppedVeggies = [];

var chopState = {
	redPepper : {
		image : null,
		chopped : null,
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		slices: [] // { xOffset : 88, Offset: 88, r: 29 }
	},
	broccoli : {
		image : null,
		chopped : null,
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		slices: []
	},
	carrot : {
		image : null,
		chopped : null,
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		slices: []
	},

	cucumber : {
		image : null, 
		chopped : null, 
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		slices: []
	},

	mushroom : {
		image : null, 
		chopped : null, 
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		slices: []
	},


	onion : {
		image : null, 
		chopped : null, 
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		slices: []
	}



	
};

var chopCount = 5; // This number determines how many times to slice, this can be done dynamically for each veggie if we want, or could be used to increase difficulty


// PRELOAD

function preload(){

	//LOAD COUNTERTOP IMAGES
	pan = loadImage('/images/pan.png');
	board = loadImage('/images/board.png');
	stove = loadImage('/images/stove.png');
	chicken = loadImage('/images/chicken.png');

	//LOAD FOOD 
	redPepper = loadImage('/images/pepper-r.png');
	orangePepper = loadImage('/images/pepper-o.png');
	yellowPepper = loadImage('/images/pepper-y.png');
	broccoli = loadImage('/images/broccoli.png');
	carrot = loadImage('/images/carrot.png');
	cucumber = loadImage('/images/cucumber.png');
	mushroom = loadImage('/images/mushroom.png');
	onion = loadImage('/images/onion.png');

	chopState.redPepper.image = redPepper;
	chopState.broccoli.image = broccoli;
	chopState.carrot.image = carrot;
	chopState.cucumber.image = cucumber;
	chopState.mushroom.image = mushroom;
	chopState.onion.image = onion;


	


	redPepperSlice = loadImage('/images/Chopped/pepper-r-ch.png');
	broccoliSlice = loadImage('/images/Chopped/broccoli-ch.png');
	carrotSlice = loadImage('/images/Chopped/carrot-ch.png');
	cucumberSlice = loadImage('/images/Chopped/cucumber-ch.png');
	mushroomSlice = loadImage('/images/Chopped/mushroom-ch.png');
	onionSlice = loadImage('/images/Chopped/onion-ch.png');

	

	chopState.redPepper.chopped = redPepperSlice;
	chopState.broccoli.chopped = broccoliSlice;
	chopState.carrot.chopped = carrotSlice;
	chopState.cucumber.chopped = cucumberSlice;
	chopState.mushroom.chopped = mushroomSlice;
	chopState.onion.chopped = onionSlice;



	


	//LOAD SOUNDS

	cutting = loadSound('/sounds/cutting.mp3');
	scrape = loadSound('/sounds/scrape.mp3');
	sizzlingLoud = loadSound('/sounds/sizzling-loud.mp3');
	sizzlingSoft = loadSound('/sounds/sizzling-soft.mp3');
	noise = loadSound('/sounds/kitchen-background.mp3');
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
	Cucumber();
	Mushroom();
	Onion();


	//DRAW GAME BACKGROUND
	imageMode(CENTER);
	image(stove, stoveWidth * .5,  stoveHeight * .45, stoveWidth, stoveHeight);
	image(pan, panX, panY, panWidth, panHeight);
	image(board, windowWidth-boardWidth*.5, windowHeight-boardHeight*.55, boardWidth, boardHeight);
	image(chicken, chickenX, chickenY, chickenWidth,chickenHeight);
	image(redPepper, pepperX, pepperY, pepperWidth, pepperHeight);
	image(broccoli, broccoliX, broccoliY, broccoliWidth, broccoliHeight);
	image(carrot, carrotX, carrotY, carrotWidth, carrotHeight);
	image(cucumber, cucumberX, cucumberY, cucumberWidth, cucumberHeight);
	image(mushroom, mushroomX, mushroomY, mushroomWidth, mushroomHeight);
	image(onion, onionX, onionY, onionWidth, onionHeight);


	
	// noise.loop();
	
}


// DRAW

function draw() {
	background('#BCC6CC');
	imageMode(CENTER);
	image(stove, stoveWidth * .5,  stoveHeight * .45, stoveWidth, stoveHeight);
	image(pan, panX, panY, panWidth, panHeight);
	image(board, windowWidth-boardWidth*.5, windowHeight-boardHeight*.55, boardWidth, boardHeight);
	image(chicken, chickenX, chickenY, chickenWidth,chickenHeight);

	// Rendering Veggies if they still need to be chopped
	if ( chopState.redPepper.slices.length < chopCount ) image(redPepper, pepperX, pepperY, pepperWidth, pepperHeight);
	if ( chopState.broccoli.slices.length < chopCount ) image(broccoli, broccoliX, broccoliY, broccoliWidth, broccoliHeight);
	if ( chopState.carrot.slices.length < chopCount ) image(carrot, carrotX, carrotY, carrotWidth, carrotHeight);
	if ( chopState.cucumber.slices.length < chopCount ) image(cucumber, cucumberX, cucumberY, cucumberWidth, cucumberHeight);
	if ( chopState.mushroom.slices.length < chopCount ) image(mushroom, mushroomX, mushroomY, mushroomWidth, mushroomHeight);
	if ( chopState.onion.slices.length < chopCount ) image(onion, onionX, onionY, onionWidth, onionHeight);




	// Render Slices
	for (var veg in chopState) {
		for (var v = 0; v < chopState[veg].slices.length; v++) {

			image(
				chopState[veg].chopped, // chopped Image
				chopState[veg].x + chopState[veg].slices[v].xOffset, // X coordinates
				chopState[veg].y + chopState[veg].slices[v].yOffset, // Y coordinates
				chopState[veg].choppedW, // chopped Width
				chopState[veg].choppedH  // chopped Height
			)
		}
	}
	
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
	if (dist(mouseX, mouseY, cucumberX, cucumberY) < cucumberWidth * .5){
		dragCucumber = true;
	}
	if (dist(mouseX, mouseY, mushroomX, mushroomY) < mushroomWidth * .5){
		dragMushroom = true; 
	}
	if (dist(mouseX, mouseY, onionX, onionY) < onionWidth * .5){
		dragOnion = true;
	}
	/*if (dist(mouseX, mouseY, yellowPepperX, yellowPepperY) < yellowPepperWidth * .5){
		dragYellowPepper = true;
	}
	if (dist(mouseX, mouseY, orangePepperX, orangePepperY) < orangePepperWidth * .5){
		dragOrangePepper = true;
	}
	
	
	*/

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

	if(dragCucumber == true){
		cucumberX = mouseX;
		cucumberY = mouseY;
	}

	if(dragMushroom == true){
		mushroomX = mouseX;
		mushroomY = mouseY;
	}

	if (dragOnion == true){
		onionX = mouseX;
		onionY = mouseY;
	}
	

}


//DROPPING FOOD WHEN MOUSE IS RELEASED. FLAG SWITCH TO FALSE.
function mouseReleased(){
	var veggieToCheck = dragredPepper ? [pepperX, pepperY, 'redPepper'] :
						dragBroccoli  ? [broccoliX, broccoliY, 'broccoli'] :
						dragCarrot    ? [carrotX, carrotY, 'carrot'] : 
						dragCucumber ? [cucumberX, cucumberY, 'cucumber'] : 
						dragMushroom ? [mushroomX, mushroomY, 'mushroom'] :
						dragOnion ? [onionX, onionY, 'onion'] : [0,0, ''];


	isVeggieOverBoard(veggieToCheck); 
	
	dragredPepper = false;
	dragBroccoli = false;
	dragCarrot = false;
	dragCucumber = false;
	dragMushroom = false;
	dragOnion = false;
}


function keyPressed (e) {
	if (keyCode == 32) {
		window.counterTop.socket.emit('space-down');
	}
}
function keyReleased (e) {
	if (keyCode == 32) {
		window.counterTop.socket.emit('space-up');
	}
}


function isVeggieOverBoard (xyV) {
	var veggieX = xyV[0],
		veggieY = xyV[1],
		veggieType = xyV[2]

	if ( veggieX > ( windowWidth - boardWidth ) && veggieY > ( windowHeight - boardHeight ) ) {

		// if (!!boardState.veggieOnBoard) boardState[boardState.veggieOnBoard] = false;
		boardState.veggieOnBoard = veggieType;
		boardState[veggieType] = true;
		chopState[veggieType].x = veggieX;
		chopState[veggieType].y = veggieY;
	}
}




// p5 Code Ends Here





// Main JS for handling events and telling p5 to do things
function CounterTop () {
	var self = this;

	this.handleSessionStarted = function (payload) {
		console.log('Session Starting: ', payload.pin);
		console.log('Pair your device at http://[YOUR.IP.ADRESS]:8000/multitool.html');
		// console.log('CounterTop Server Socket', payload.socket);
	};

	this.handleCookingAction = function (payload) {
		// console.log('COOKING ACTION!!!   ' + payload.type );
		if ( payload.type === 'knfieL' || payload.type === 'knifeR') {

			if ( !!boardState.veggieOnBoard && chopState[boardState.veggieOnBoard].slices.length < chopCount) {
				var range = 75;

				chopState[boardState.veggieOnBoard].slices.push({ 
					xOffset : random( -range, range), 
					yOffset : random( -range, range) 
				});

				if (chopState[boardState.veggieOnBoard].slices.length === chopCount) {
					boardState[boardState.veggieOnBoard] = false;
					choppedVeggies.push(boardState.veggieOnBoard);
					boardState.veggieOnBoard = '';

					// If multiple vegitables on board then reset active veg
					for (var veg in boardState) {
						if (!!boardState[veg]) boardState.veggieOnBoard = veg;
					}
				}
			}


		} else if ( choppedVeggies.length && payload.type === 'swipe' ) {
			var vegToSwipe = choppedVeggies.shift();
			switch(vegToSwipe) {
				case 'redPepper':
					chopState.redPepper.x = panX;
					chopState.redPepper.y = panY  * .7;
				break;
				case 'carrot':
					chopState.carrot.x = panX;
					chopState.carrot.y = panY * .7;
				break;
				case 'broccoli':
					chopState.broccoli.x = panX;
					chopState.broccoli.y = panY  * .7;					
				break;
			}

		}
	};

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
	});
	this.socket.on('tool-disconnected', function (payload) {
		console.log("tool disconnected : ", payload.pin);
	});

	this.socket.on('cooking-action', self.handleCookingAction);
}

window.counterTop = new CounterTop();