/***********************************************************************************
  Consciousness_reader
  by Xinyu Yang

  This is the files using p5.play.js and p5.2DAdventure.js libraries to create 
  a Speculative Technology story and shows how it will effect in the communities
  The game is clickable which the player as the CEO of the company will choose 
  how they want the company goes. The player will use the mouse to make 
  decisions and the communities will show they attitude to this product and 
  company.
  
------------------------------------------------------------------------------------

***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.play
var playerSprite;
var playerAnimation;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

var avatarAnimations = [];
var selectedAvatarAnimation = 0;  // default to zero


// Allocate Adventure Manager with states table and interaction tables
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');

  // Preload images
  S1YesResult = loadImage('assets/S1YesS2.png');
  S2CheapResult = loadImage('assets/S2100S3.png');
  S2ExpensiveResult = loadImage('assets/S21000S4.png');
  S3IgnoreResult = loadImage('assets/S3IgnoreS5.png');
  S3RepairResult = loadImage('assets/S3RepairS6.png');
  S4YesResult = loadImage('assets/S4YesS9.png');
  S5YesResult = loadImage('assets/S3RepairS6.png');
  S6DonationResult = loadImage('assets/S6DonateS7.png');
  S6LoansResult = loadImage('assets/S6LoansS8.png');
}

// Setup the adventure manager
function setup() {
  createCanvas(1920, 1080);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

    // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  fs = fullscreen();
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
  
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }
}


function mouseReleased() {
  adventureManager.mouseReleased();
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // Hide bag buttons
  for( let i = 0; i < clickables.length; i++ ) {
      clickables[i].color = "#00000000";
      clickables[i].strokeWeight = 0;
      clickables[i].onPress = clickableButtonPressed;
  }    
  Hoverweight = 0;
  Hoverheight = 390;

  // Hover effects for each buttons in different rooms
  clickables[4].onHover = clickable4ButtonHover;
  clickables[7].onHover = clickable7ButtonHover;
  clickables[8].onHover = clickable8ButtonHover;
  clickables[9].onHover = clickable9ButtonHover;
  clickables[10].onHover = clickable10ButtonHover;
  clickables[11].onHover = clickable11ButtonHover;
  clickables[13].onHover = clickable10ButtonHover;
  clickables[15].onHover = clickable15ButtonHover;
  clickables[16].onHover = clickable16ButtonHover;
}

// tint when mouse is over
clickable4ButtonHover = function () {
  image(S1YesResult,Hoverweight,Hoverheight); 
}

clickable7ButtonHover = function () {
  image(S2CheapResult,Hoverweight,Hoverheight); 
}

clickable8ButtonHover = function () {
  image(S2ExpensiveResult,Hoverweight,Hoverheight); 
}

clickable9ButtonHover = function () {
  image(S3IgnoreResult,Hoverweight,Hoverheight); 
}

clickable10ButtonHover = function () {
  image(S3RepairResult,Hoverweight,Hoverheight); 
}

clickable11ButtonHover = function () {
  image(S4YesResult,Hoverweight,Hoverheight); 
}

clickable15ButtonHover = function () {
  image(S6DonationResult,Hoverweight,Hoverheight); 
}

clickable16ButtonHover = function () {
  image(S6LoansResult,Hoverweight,Hoverheight); 
}


clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
}
