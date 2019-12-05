/* 
Based on Dan Shiffman's video 6.5 p5.js Adding Removing Objects 
Code for https://vimeo.com/channels/learningp5js/141211392
Concepts introducing push(), splice() 1:30
*/

var bubbles = [];
var apple;
var targets = [];
var maxLen;
var minLen;
var Target;
var hi_score
var play;
var score;

function preload() {
  apple = loadImage('media/apple.png');
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  maxLen = 10; // Initialize max length
  minLen = 15; // Set minimum length
  hi_score = 0;
  targets.push(new Target());
  play = 0;
  score = 0;
}

// TASK 2a - Try changing mouseClicked() to mouseMoved().  What happens?
// TASK 2b - Try changing mouseMoved() to mouseDragged().  What's different?
function mouseMoved() {
  bubblesAndApples();
}

function mouseDragged() {
  bubblesAndApples();
}

function draw() {
  background(0);
  showScore();
  for (var i = 0; i < targets.length; i++) {
    targets[i].display();
  }

  if (play == 0) {
    textSize(20);
    fill(255);
    noStroke();
    text("Move your mouse around to drag the bubbles.", 100, 100);
    text("\"Eat\" the apples to get more bubbles.", 100, 130);
    text("Don't crash into your own bubbles.", 100, 160);
    text("If you go out of bounds, game over!", 100, 190);

    if (mouseX > 0 || mouseY > 0) {
      play = 1;
    }

  } else if (play == 1) {

    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].move();
      bubbles[i].display();
      if (maxLen > 30 && i < (maxLen - minLen) && bubbles[i].cut()) {
        bubbles.splice(0, i);
        maxLen = bubbles.length;
      }
    }

    if (mouseX < 4 || mouseX > width - 10 || mouseY < 10 || mouseY > height - 10) {
      play = -1;
    }
  } else if (play == -1) {
    textSize(50);
    fill(255, 255, 0);
    text("Game Over!", width / 4, height / 2);
  }

}

function showScore() {
  if(play == 1)
    score = maxLen;
  textSize(18);
  fill(255);
  noStroke();
  text("Score: " + score, 10, 20);
  if (score > hi_score)
    hi_score = score;
  text("Hi Score: " + hi_score, 310, 20);
}

function bubblesAndApples() {
  bubbles.push(new Bubble(mouseX, mouseY));

  // TASK 3 - There are too many bubbles! Use:
  //          bubbles.splice(0,1);
  //          to splice or cut out the first bubble in the array
  //          IF there are too many (you decide what too many is).
  //          Uncomment the line below to start.
  if (bubbles.length > maxLen)
    bubbles.splice(0, 1);

  for (var i = 0; i < targets.length; i++) {
    if (targets[i].edible() <= 10) {
      targets.splice(i, 1);
      maxLen += 5;
      targets.push(new Target());
    }
  }
}

// TASK 1 - Add parameters so the bubbles appear where the mouse is clicked
function Bubble(x, y) {
  this.x = x;
  this.y = y;

  this.display = function() {
    stroke(255);
    fill(100, 100, 255, 40);
    ellipse(this.x, this.y, 24, 24);
  }

  this.move = function() {
    this.x = this.x + random(-.5, .5);
    this.y = this.y + random(-.5, .5);
  }

  this.cut = function() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 12)
      return true;
    else
      return false;
  }
}

function Target() {
  this.x = random(20, width - 20);
  this.y = random(20, height - 20);

  this.display = function() {
    image(apple, this.x, this.y, 24, 24);
  }

  this.edible = function() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d;
  }

}