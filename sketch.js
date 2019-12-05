

var snake = [];
var apple;
var targets = [];
var maxLen;
var minLen;
var Target;
var hi_score
var play;
var score;

var col= 50;
var c= 100;
var d= 50;


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

function mouseMoved() {
  snakeAndApples();
}

function mouseDragged() {
  snakeAndApples();
}

function draw() {
  
  col,c,d = mouseX/3;
  background (col,c,d);
  showScore();
  for (var i = 0; i < targets.length; i++) {
    targets[i].display();
  }

  if (play == 0) {
    textSize(20);
    fill(255);
    noStroke();
    text("Move your mouse to move the snake.", 100, 100);
    text("\"Eat\" the apples to make your snake grow.", 100, 130);
    text("If you crash your snake into the walls, GAME OVER!", 100, 160);
   

    if (mouseX > 0 || mouseY > 0) {
      play = 1;
    }

  } else if (play == 1) {

    for (var i = 0; i < snake.length; i++) {
      snake[i].move();
      snake[i].display();
      if (maxLen > 30 && i < (maxLen - minLen) && snake[i].cut()) {
        snake.splice(0, i);
        maxLen = snake.length;
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

function snakeAndApples() {
  snake.push(new Snake(mouseX, mouseY));

  
  if (snake.length > maxLen)
    snake.splice(0, 1);

  for (var i = 0; i < targets.length; i++) {
    if (targets[i].edible() <= 10) {
      targets.splice(i, 1);
      maxLen += 5;
      targets.push(new Target());
    }
  }
}

function Snake(x, y) {
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