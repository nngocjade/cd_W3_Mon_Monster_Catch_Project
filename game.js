/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

let monstersCaught = 0;
let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero.png";
  // MONSTER IMAGE 1
  monsterImage1 = new Image();
  monsterImage1.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage1.src = "images/monster.png";
  // // MONSTER IMAGE 2
  // monsterImage2 = new Image();
  // monsterImage2.onload = function () {
  //   // show the monster image
  //   monsterReady = true;
  // };
  // monsterImage2.src = "images/monster.png";
  // // MONSTER IMAGE 3
  // monsterImage3 = new Image();
  // monsterImage3.onload = function () {
  //   // show the monster image
  //   monsterReady = true;
  // };
  // monsterImage3.src = "images/monster.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

// let heroX = canvas.width / 2;
// let heroY = canvas.height / 2;

// let monsterX = 100;
// let monsterY = 100;

let hero = { x: canvas.width / 2, y: canvas.height / 2 };
let monsters = [
  { x: Math.random() * canvas.width, y: Math.random * canvas.height },
  { x: Math.random() * canvas.width, y: Math.random * canvas.height },
  { x: Math.random() * canvas.width, y: Math.random * canvas.height },
];

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysPressed = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  document.addEventListener(
    "keydown",
    function (e) {
      keysPressed[e.key] = true;
    },
    false
  );

  document.addEventListener(
    "keyup",
    function (e) {
      keysPressed[e.key] = false;
    },
    false
  );
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (keysPressed["ArrowUp"]) {
    hero.y -= 5;
  }
  if (keysPressed["ArrowDown"]) {
    hero.y += 5;
  }
  if (keysPressed["ArrowLeft"]) {
    hero.x -= 5;
  }
  if (keysPressed["ArrowRight"]) {
    hero.x += 5;
  }

  // Check if player and monster collided. Our images
  // are 32 pixels big.
  monsters.forEach((monsters) => {
    if (
      hero.x <= monsters.x + 32 &&
      monsters.x <= hero.x + 32 &&
      hero.y <= monsters.y + 32 &&
      monsters.y <= hero.y + 32
    ) {
    }
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsters.x = Math.random() * canvas.width;
    monsters.y = Math.random() * canvas.height;
    monstersCaught++;
  });
};

/**
 * This function, render, runs as often as possible.
 */
function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage1, monsters.x, monsters.y);
  }
  ctx.fillText(
    `Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`,
    20,
    100
  );
}

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
function main() {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers.
  requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
