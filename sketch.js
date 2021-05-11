/***********************************************************************************
  Consciousness_reader
  by Xinyu Yang

  Uses the p5.2DAdventure.js class 
  
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

// indexes into the clickable array (constants)
const playGameIndex = 0;
const chooseAvatarIndex = 1;
const doneIndex = 2;

var avatarAnimations = [];
var selectedAvatarAnimation = 0;  // default to zero



// Allocate Adventure Manager with states table and interaction tables
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
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

  // dispatch key events for adventure manager to move from state to 
  // state or do special actions - this can be disabled for NPC conversations
  // or text entry   
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

  // // All clickables to have same effects
  // for( let i = 0; i < clickables.length; i++ ) {
  //   clickables[i].onHover = clickableButtonHover;
  //   clickables[i].onOutside = clickableButtonOnOutside;
  //   clickables[i].onPress = clickableButtonPressed;
  // }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);

  // Other non-state changing ones would go here.
}


