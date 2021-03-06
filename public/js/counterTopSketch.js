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
	chickenWidth = chickenHeight * .93;
	chickenX = panX;
	chickenY = panY * .7;

}

// DECLARE FOOD 

function Pepper(x, y) {
	pepperWidth = boardWidth * .08;
	pepperHeight = pepperWidth * 1.26;
	pepperX = windowWidth-boardWidth*.5;
	pepperY = windowHeight * .2;

	pepperSliceHeight = pepperHeight;
	pepperSliceWidth = pepperSliceHeight * .52 ;

	chopState.redPepper.h = pepperHeight;
	chopState.redPepper.w = pepperWidth;
	chopState.redPepper.choppedW = pepperSliceWidth;
	chopState.redPepper.choppedH = pepperSliceHeight;
}

function Broccoli() {
	broccoliWidth = boardWidth * .19;
	broccoliHeight = broccoliWidth * 1.03;
	broccoliX = windowWidth-boardWidth*.75;
	broccoliY = windowHeight * .2;

	broccoliSliceHeight = broccoliHeight * .5;
	broccoliSliceWidth = broccoliSliceHeight * .55;

	chopState.broccoli.h = broccoliHeight;
	chopState.broccoli.w = broccoliWidth;
	chopState.broccoli.choppedW = broccoliSliceWidth;
	chopState.broccoli.choppedH = broccoliSliceHeight;
}

function Carrot() {
	carrotWidth = boardWidth * .18;
	carrotHeight = carrotWidth * .72;
	carrotX = windowWidth-boardWidth*.6;
	carrotY = windowHeight * .3;

	carrotSliceHeight = carrotHeight * .5;
	carrotSliceWidth = carrotSliceHeight;

	chopState.carrot.h = carrotHeight;
	chopState.carrot.w = carrotWidth;
	chopState.carrot.choppedW = carrotSliceWidth;
	chopState.carrot.choppedH = carrotSliceHeight;
}

function Cucumber () {
	cucumberWidth = boardWidth * .18;
	cucumberHeight = cucumberWidth * .63;
	cucumberX = windowWidth-boardWidth;
	cucumberY = windowHeight * .3;

	cucumberSliceHeight = cucumberHeight * .5;
	cucumberSliceWidth = cucumberSliceHeight;

	chopState.cucumber.h = cucumberHeight;
	chopState.cucumber.w = cucumberWidth;
	chopState.cucumber.choppedW = cucumberSliceWidth;
	chopState.cucumber.choppedH = cucumberSliceHeight;
}

function Mushroom () {
	mushroomWidth = boardWidth * .06;
	mushroomHeight = mushroomWidth * .96;
	mushroomX = windowWidth-boardWidth;
	mushroomY = windowHeight * .2;

	mushroomSliceHeight = mushroomHeight * .5;
	mushroomSliceWidth = mushroomSliceHeight * 1.17;

	chopState.mushroom.h = mushroomHeight;
	chopState.mushroom.w = mushroomWidth;
	chopState.mushroom.choppedW = mushroomSliceWidth;
	chopState.mushroom.choppedH = mushroomSliceHeight;
}

function Onion () {
	onionWidth = boardWidth * .08;
	onionHeight = onionWidth * 1.31;
	onionX = windowWidth-boardWidth*.3;
	onionY = windowHeight * .3;

	onionSliceHeight = onionHeight * .5;
	onionSliceWidth = onionSliceHeight * 2.04;

	chopState.onion.h = onionHeight;
	chopState.onion.w = onionWidth;
	chopState.onion.choppedW = onionSliceWidth;
	chopState.onion.choppedH = onionSliceHeight;
}

function Salt () {
	saltingWidth = panWidth * .75;
	saltingHeight = panWidth * 75;
	saltingX = panX;
	saltingY = panY * .7;
}


var cucumber, mushroom, onion, mushroom, onion, pepper; 
var windowW, windowH;


//Flags that determine if mouse is in the radius of a certain food when pressed
var dragredPepper = false;
var dragBroccoli = false;
var dragCarrot = false;
var dragCucumber = false;
var dragOrangePepper = false;
var dragYellowPepper = false;
var dragCucumber = false;
var dragMushroom = false;
var dragOnion = false;

//FLAGS for instructions
var showPinIns = true;
//FLAGS THAT DETERMINE IF MOUSE IS IN THE START BUTTON
var showPickIns = false;
var showKnifeIns = false;
var showSpoonIns = false;
var showSaltIns = false;

var roundReadyToStart = false;

// Salt variables
var isSalting = false,
	saltingSize, saltImg,
	saltingIndex = 0,
	saltingIndexStart = 7;

// Board and Veggie State Variables
var clutchIsEngaged = false;
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
var fryingVeggies = [];

var chopState = {
	redPepper : {
		image : null,
		chopped : null,
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		bX : 0,
		bY : 0,
		slices: [] // { xOffset : 88, Offset: 88, r: 29 }
	},

	broccoli : {
		image : null,
		chopped : null,
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		bX : 0,
		bY : 0,
		slices: []
	},

	carrot : {
		image : null,
		chopped : null,
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		bX : 0,
		bY : 0,
		slices: []
	},

	cucumber : {
		image : null, 
		chopped : null, 
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		bX : 0,
		bY : 0,
		slices: []
	},

	mushroom : {
		image : null, 
		chopped : null, 
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		bX : 0,
		bY : 0,
		slices: []
	},

	onion : {
		image : null, 
		chopped : null, 
		choppedW : 0,
		choppedH : 0,
		x : 0,
		y : 0,
		bX : 0,
		bY : 0,
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

	saltImg = loadImage('/images/salt-particles.png');

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
	salting = loadSound ('/sounds/salting.mp3');

	//LOAD INSTRUCTIONS
	findPin = loadImage('/images/Instructions/find-pins.png');
	knifeIns = loadImage('/images/Instructions/knife-instructions.png');
	pickVeggie = loadImage('/images/Instructions/pick-veggies.png');
	saltIns = loadImage('/images/Instructions/salt-instructions.png');
	spoonIns = loadImage('/images/Instructions/spoon-instructions.png');
	
	//LOAD BOTTONS
	retry = loadImage('/images/retry.png');


}


// SETUP

var seconds = 45; 
var timer; 
var failScreen = false; 
var timeInterval;

//REDUCE TIME	
function reduceTime () {
	if(seconds > 0) {
		seconds--;
		$(".ptimer").html(seconds);
	} else {
		clearInterval(timeInterval);
		$('body').removeClass('playing');
		failScreen = true;
		muteButton.hide(); 
		timer.hide(); 	 
	}

	if (seconds <= 10) {
		timer.style("color", "#D90429");
	}
}

//TIMER COUNTDOWN WORK IN PROGRESS
function runTimer() {
	$('body').addClass('playing');
	timeInterval = setInterval(reduceTime, 1000);
	startButton.hide();
	 
}

function setup() {


	

	//END SCREEN
	succeed = loadImage('/images/succeeded.png');
	fail = loadImage('/images/fail.png');


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
	Salt();


	//TIMER
	timer = createP (seconds);
	timer.style("font-size", "40px");
  	timer.style("font-family", "Open Sans");
  	timer.style("color", "black");
  	timer.addClass("ptimer");

	

	//LOAD BUTTONS
	muteButton = createButton ("SOUND OFF");
	muteButton.mousePressed(mute);
	muteButton.style("color", "#A5A5A5");
	muteButton.style("border-color", "#A5A5A5");

	startButton = createButton ("START");
	startButton.mousePressed(runTimer);
	startButton.style("background-color", "teal");
	startButton.style("color", "white");

	//Board Positioning Variables
	createCanvas(windowWidth, windowHeight);
	boardAnchorX = windowWidth * .5;
	boardAnchorY = windowHeight - boardHeight * .55;
	boardDestY = panY + (panHeight * .1);
	boardDestX = panX + (panWidth * .5);
	boardAnimXinc = (boardAnchorX - boardDestX) / 15;
	boardAnimYinc = (boardAnchorY - boardDestY) / 15;

	//SET GAME BACKGROUND
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


	saltingSize = panWidth * .67;
	
	//RUN BACKGROUND NOISE WHEN PAGE LOADS
	noise.loop();
	noise.setVolume(.5);
}

var boardRotation = 0,
		boardAnchorX, boardAnchorY,
		boardDestX, boardDestY,
		boardAnimX = 0, boardAnimY = 0,
		boardAnimXinc, boardAnimYinc,
		boardAnimIndex = 0;

function animateBoardToPan () {
	if (clutchIsEngaged && boardRotation < 0.15) {
		boardAnimIndex++;
		boardRotation += 0.01;
	} else if (!clutchIsEngaged && boardRotation > 0) {
		boardAnimIndex--;
		boardRotation -= 0.01;
	}

	boardAnimX = boardAnimXinc * boardAnimIndex;
	boardAnimY = boardAnimYinc * boardAnimIndex;
}



// DRAW

function draw() {
	background('#BCC6CC');

	//DRAW MUTE BUTTON
	muteButton.position(windowWidth*.75, windowHeight * .02);

	//DRAW TIMER
	timer.position(windowWidth*.9, windowHeight * .02);

	//DRAW START BUTTON
	startButton.position(windowWidth*0.65, windowHeight * .02);

	//DRAW COUNTERTOP
	imageMode(CENTER);
	image(stove, stoveWidth * .5,  stoveHeight * .45, stoveWidth, stoveHeight);
	image(pan, panX, panY, panWidth, panHeight);
	image(chicken, chickenX, chickenY, chickenWidth,chickenHeight);

	//Render Board
	push();
	if (clutchIsEngaged || boardRotation) animateBoardToPan();
	translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
	rotate(PI * boardRotation);
	image(board, boardWidth * .5, 0, boardWidth, boardHeight);
	pop();
	

	// Rendering Veggies if they still need to be chopped
	if ( chopState.onion.slices.length < chopCount ) {
		if (boardState.onion){
			push();
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		}
		image(onion, 
					(boardState.onion ? chopState.onion.bX : onionX), 
					(boardState.onion ? chopState.onion.bY : onionY),
					onionWidth, onionHeight);
		if (boardState.onion) pop();
	}

	if ( chopState.mushroom.slices.length < chopCount ) {
		if (boardState.mushroom){
			push();
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		}
		image(mushroom, 
					(boardState.mushroom ? chopState.mushroom.bX : mushroomX), 
					(boardState.mushroom ? chopState.mushroom.bY : mushroomY),
					mushroomWidth, mushroomHeight);
		if (boardState.mushroom) pop();
	}

	if ( chopState.cucumber.slices.length < chopCount ) {
		if (boardState.cucumber){
			push();
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		}
		image(cucumber, 
					(boardState.cucumber ? chopState.cucumber.bX : cucumberX), 
					(boardState.cucumber ? chopState.cucumber.bY : cucumberY), 
					cucumberWidth, cucumberHeight);
		if (boardState.cucumber) pop();
	}

	if ( chopState.redPepper.slices.length < chopCount ) {
		if (boardState.redPepper){
			push();
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		}
		image(redPepper, 
					(boardState.redPepper ? chopState.redPepper.bX : pepperX), 
					(boardState.redPepper ? chopState.redPepper.bY : pepperY), 
					pepperWidth, pepperHeight);
		if (boardState.redPepper) pop();
	}

	if ( chopState.broccoli.slices.length < chopCount ) {
		if (boardState.broccoli){
			push();
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		}
		image(broccoli, 
					(boardState.broccoli ? chopState.broccoli.bX : broccoliX), 
					(boardState.broccoli ? chopState.broccoli.bY : broccoliY), 
					broccoliWidth, broccoliHeight);
		if (boardState.broccoli) pop();
	}

	if ( chopState.carrot.slices.length < chopCount ) {
		if (boardState.carrot){
			push();
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		} 
		image(carrot, 
					(boardState.carrot ? chopState.carrot.bX : carrotX), 
					(boardState.carrot ? chopState.carrot.bY : carrotY), 
					carrotWidth, carrotHeight);
		if (boardState.carrot) pop();
	}


	// Render Slices
	
	for (var veg in chopState) {
		push();

		// Determine Translation point (board anchor or pan)
		if (boardState[veg] || choppedVeggies.indexOf(veg) !== -1) {
			translate(boardAnchorX - boardAnimX, boardAnchorY - boardAnimY);
			rotate(PI * boardRotation);
		} else {
			translate(panX, panY - (panHeight * .175));
		}

		// Render all Slices
		for (var v = 0; v < chopState[veg].slices.length; v++) {
			push();
			if (boardState[veg] || choppedVeggies.indexOf(veg) !== -1) {
				translate(chopState[veg].bX, chopState[veg].bY);
			}
			rotate(chopState[veg].slices[v].rotation);
			image(
				chopState[veg].chopped, // chopped Image
				chopState[veg].slices[v].xOffset, // X coordinates
				chopState[veg].slices[v].yOffset, // Y coordinates
				chopState[veg].choppedW, // chopped Width
				chopState[veg].choppedH  // chopped Height
			)
			pop();
		}

		pop();
	}

	// Render Salting
	if (isSalting) {
		push();
		tint(255, ( (saltingIndex / saltingIndexStart) * 255) );
		translate(panX, (panY * .7))
		rotate(random(360));
		var newSaltSize = saltingSize + (saltingIndex) * 10;
		image(saltImg, 0, 0, newSaltSize, newSaltSize);

		pop();
		saltingIndex--;
		if (saltingIndex === 0) isSalting = false;
	}
	// clear()
	// image(saltImg, panX, (panY * .7), saltingSize, saltingSize);
	// image(saltImg, saltingX, saltingY, saltingWidth, saltingHeight);

	//INSTRUCTIONS
	if (showPickIns == true){
		image (pickVeggie, windowWidth - boardWidth * 0.7, windowHeight * .25, windowWidth * 0.3, windowWidth * .13); 
	}
	if (showKnifeIns == true){
		image (knifeIns, windowWidth-boardWidth*.5, windowHeight-boardHeight*.55, boardWidth*0.7, boardWidth*0.7);
	}
	if (showSpoonIns == true){
		image (spoonIns, stoveWidth * .52, stoveHeight * .32, boardWidth*0.7, boardWidth*0.78);
	}
	if (showSaltIns == true) {
		image (saltIns, stoveWidth * .52, stoveHeight * .32, boardWidth*0.7, boardWidth*0.72); 
	}
	 
	//Succeed ending page: shows when 5 shake is done within time limit
	if (GameState.isComplete) {
		image (succeed, windowWidth*0.5, windowHeight*0.5, windowWidth, windowWidth*.72);
		muteButton.hide(); 
		timer.hide(); 
	}
	
	//fail ending page: shows when time runs out
	if (failScreen) {
		image (fail, windowWidth*0.5, windowHeight*0.5, windowWidth, windowWidth*.72);
	}
	
	// Showing the retry button when game is over
	if (failScreen) {
		image (retry, windowWidth*.5, windowHeight-boardHeight*.4, boardWidth/5, boardWidth/5);
	}



}



//RESIZE WINDOW WILL RESET ANIMATION
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // todo: update all other vars
}


//MOUSE PRESS FOR DRAGGING. IF MOUSE IS WITHIN THE CIRCLE WITH A RADIUS OF 0.5 WIDTH OF THE FOOD, THE FLAG WILL BE TRUE 
function mousePressed(){
	if (!roundReadyToStart) return; // block dragging of veggies if game is not ready!

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
	if(dragCucumber == true){
		cucumberX = mouseX;
		cucumberY = mouseY;
	}
	if (dragOnion == true){
		onionX = mouseX;
		onionY = mouseY;
	}

}

// PREVIOUS INSTRUCTION DISAPEAR AND NEW ONE COMES UP
function mouseClicked(){
	if (showPickIns == true) {
		showPickIns = false;
		showKnifeIns = true; 
	}
	else if (showKnifeIns == true){
		showKnifeIns = false;
		showSpoonIns = true; 
	}
	else if (showSpoonIns == true){
		showSpoonIns = false;
		showSaltIns = true; 
	}
	else if (showSaltIns == true){
		showSaltIns = false;
		roundReadyToStart = true; // todo: move this to the start button click when timer is ready
	}

	//retry/reload the content when retry button is pressed
	if (dist(mouseX, mouseY, windowWidth*.5, windowHeight-boardHeight*.4) <  boardWidth/10){
		// location.reload();
		failScreen = false;
		GameState.resetGame();
	}

	if ( GameState.isComplete ) {
		if (GameState.currentLevel <= 5) {
			GameState.isComplete = false;
			GameState.resetGame();	
		} else {
			alert("Congratulations you are the top chef!! Your score this is " + GameState.userScore + "! Play again and try to beat your score by pressing OK!");
			location.reload();
		}
		
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

	switch (keyCode) {
		case 32: // "space"
			window.counterTop.socket.emit('space-down');
			clutchIsEngaged = true;
		break;
		case 67: // "c"
			window.counterTop.handleCookingAction({ type: 'knifeR' });
		break;
		case 83: // "s"
			window.counterTop.handleCookingAction({ type: 'swipe' });
		break;
		case 68: // "d"
			window.counterTop.handleCookingAction({ type: 'spoon' });
		break;
		case  65: // "a"
			window.counterTop.handleCookingAction({ type: 'shaker' });
		break;
	}
}

function keyReleased (e) {
	if (keyCode == 32) {
		window.counterTop.socket.emit('space-up');
		clutchIsEngaged = false;
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
		chopState[veggieType].bX = veggieX - boardAnchorX;
		chopState[veggieType].bY = veggieY - boardAnchorY;
	}
}

//MUTE SOUND 
function mute() {

 if (!noise.isPlaying()) {
   noise.play();
   noise.setVolume(.5);
   muteButton.html("SOUND OFF")
 } else {
   noise.setVolume(0);
   noise.pause();
   muteButton.html("SOUND ON")
 }

}





// p5 Code Ends Here
var allVeggies = ['Cucumber', 'Mushroom', 'Onion', 'Broccoli', 'Carrot', 'Red Pepper'];
var GameState = {
	veggiesRequired: [],
	veggiesCompleted: [],
	stirAmount : 0,
	saltAmount : 0,
	isComplete : false,
	currentLevel : 1,
	userScore : 0,

	initNewGame : function () {
		$('body').removeClass('win');
		var vegList = allVeggies.slice(0);
		var vegCount = 1 + Math.floor(GameState.currentLevel * 1.125);
		for (var i = 0; i < vegCount; i++) {
			var v = Math.floor(Math.random() * vegList.length);
			var veg = vegList[v];
			vegList.splice(v, 1);
			GameState.veggiesRequired.push(veg);
		}
		GameState.stirAmount = Math.floor(GameState.veggiesRequired.length * 2.125);
		GameState.saltAmount = Math.floor(GameState.veggiesRequired.length * .75);

		GameState.renderRecipeList();
		$('.ptimer').html(45);
	},

	renderRecipeList : function () {
		$('#listEl').empty();
		for (var ii = 0; ii < GameState.veggiesCompleted.length; ii++) {
			var vegg = GameState.veggiesCompleted[ii];
			$('#listEl').append('<li class="' + vegg + ' done">' + vegg + '</li>');
		}
		for (var i = 0; i < GameState.veggiesRequired.length; i++) {
			var veg = GameState.veggiesRequired[i];
			$('#listEl').append('<li class="' + veg + '">' + veg + '</li>');
		}
		$('#listEl').append('<li class="salt' + (GameState.saltAmount ? '' : ' done') + '">Salt' + (GameState.saltAmount ? ' x' + GameState.saltAmount : '') + '</li>');
		$('#listEl').append('<li class="sitr' + (GameState.stirAmount ? '' : ' done') + '">Stir' + (GameState.stirAmount ? ' x' + GameState.stirAmount : '') + '</li>');
	
		if ( !GameState.saltAmount && !GameState.stirAmount & !GameState.veggiesRequired.length ) {
			clearInterval(timeInterval);
			GameState.userScore += seconds;
			GameState.isComplete = true;
			GameState.currentLevel++;
			$('body').removeClass('playing');
			$('body').addClass('win');
		}
	},

	resetGame : function() {
		startButton.show();
		muteButton.show(); 
		timer.show(); 	
		seconds = 45;
		choppedVeggies = [];
		fryingVeggies = [];
		GameState.veggiesRequired = [];
		GameState.veggiesCompleted = [];

		for (var veg in chopState) {
			chopState[veg].x = 0;
			chopState[veg].y = 0;
			chopState[veg].bX = 0;
			chopState[veg].bY = 0;
			chopState[veg].slices = [];
		}

		for (var vegg in boardState) {
			boardState[vegg] = (vegg === 'veggieOnBoard') ? '' : false;
		}

		Pepper();
		Broccoli();
		Carrot();
		Cucumber();
		Mushroom();
		Onion();

		GameState.initNewGame();
	}
};


// Main JS for handling events and telling p5 to do things
function CounterTop () {
	var self = this;

	this.handleSessionStarted = function (payload) {
		console.log('Session Starting: ', payload.pin);
		console.log('Pair your device at http://[YOUR.IP.ADRESS]:8000/multitool');
		// $('.multitoolLink').text('http://[YOUR.IP.ADRESS]:8000/multitool')
		// 				   .attr('href', 'http://localhost:8000/multitool');
		$('.multitoolPin').text(payload.pin);

		new QRCode(document.getElementById("qrcode"), location.origin + "/multitool?" + payload.pin);

		GameState.initNewGame();
	};

	this.handleCookingAction = function (payload) {
		// console.log('COOKING ACTION!!!   ' + payload.type );

		if ( payload.type === 'knfieL' || payload.type === 'knifeR') {
			cutting.play();
			cutting.setVolume(1);

			if ( !!boardState.veggieOnBoard && chopState[boardState.veggieOnBoard].slices.length < chopCount) {
				var range = 75;

				chopState[boardState.veggieOnBoard].slices.push({ 
					xOffset : (random( -50, 50) / 100) * (chopState[boardState.veggieOnBoard].w || 5), 
					yOffset : (random( -50, 50) / 100) * (chopState[boardState.veggieOnBoard].h || 5),
					rotation: random(360)
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
			scrape.play();
			scrape.setVolume(1);
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
				case 'onion':
					chopState.onion.x = panX;
					chopState.onion.y = panY  * .7;					
				break;
				case 'cucumber':
					chopState.cucumber.x = panX;
					chopState.cucumber.y = panY  * .7;					
				break;
				case 'mushroom':
					chopState.mushroom.x = panX;
					chopState.mushroom.y = panY  * .7;					
				break;
			}
			fryingVeggies.push(vegToSwipe);

			// Check and Update Required Veggies
			for (var i=0; i<GameState.veggiesRequired.length; i++) {
				var veg = GameState.veggiesRequired[i];
				if ( veg.toLowerCase().replace(' ','') === vegToSwipe.toLowerCase() ) {
					var vegg = GameState.veggiesRequired.splice(i, 1);
					GameState.veggiesCompleted.push(vegg);

					GameState.stirAmount++; // adding more veggies means more stirring!
					GameState.renderRecipeList();
				}
			}

		} else if ( fryingVeggies.length && payload.type === 'spoon' ) {
			sizzlingLoud.play();
			sizzlingLoud.setVolume(1);
			for (var i = 0; i < fryingVeggies.length; i++) {
				for (var v = 0; v < chopState[fryingVeggies[i]].slices.length; v++) {
					chopState[fryingVeggies[i]].slices[v] = { 
						xOffset : random(-(panWidth * .25), (panWidth * .25)), 
						yOffset : random(-(panWidth * .25), (panWidth * .25)),
						rotation: random(360)
					};					
				}
			}
			GameState.stirAmount--;
			GameState.renderRecipeList();

		} else if ( fryingVeggies.length && payload.type === 'shaker') {
			salting.play();
			salting.setVolume(1);
			isSalting = true;
			saltingIndex = saltingIndexStart;
			GameState.saltAmount--;
			GameState.renderRecipeList();
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
		$('#pinOverlay').fadeOut(100);
		showPickIns = true;
	});
	this.socket.on('tool-disconnected', function (payload) {
		console.log("tool disconnected : ", payload.pin);
		$('#pinOverlay h2').text('Reconnect Your Device!');
		$('#pinOverlay').fadeIn(100);
	});

	this.socket.on('cooking-action', self.handleCookingAction);
}

window.counterTop = new CounterTop();