var GameState = 1;

var PLAY = 1

var END = 0;

var player, play;

var scene, sceneI;

var bullet, bull, bullG;

var black, blaI, blackG;

var coins, coinc, coinG;

var ufo, ufoI, ufoG;

var score;

function preload(){
play = loadAnimation("cr61.png", "cr62.png");
sceneI = loadImage("space (2).jpg");
bullet = loadAnimation("bull1.png", "bull2.png");
blaI = loadImage("black hole.png");
coinc = loadImage("coin.png");
ufoI = loadImage("UFO.png");
}

function setup(){
createCanvas(1800, 1000);

scene = createSprite(-40, 500, 2050, 2050);
scene.velocityX = -36;
scene.addImage(sceneI);
scene.scale = 9.3;

player = createSprite(100, 900);
player.addAnimation("player", play);
player.scale = 0.2;

score = 0;

bullG = new Group();

blackG = new Group();

ufoG = new Group();

coinG = new Group();
}

function draw(){
background("blue");

console.log(scene.x);

if(GameState === PLAY){

if(scene.x < 400){
  scene.x = 940;
}

var edges = createEdgeSprites();
player.collide(edges);

if(keyDown(UP_ARROW)){
  player.y = player.y - 25;
}

if(keyDown(DOWN_ARROW)){
  player.y = player.y + 25;
}

if(keyDown("space")){
  spawnBullets();
}

if(blackG.isTouching(player) || ufoG.isTouching(player)){
  player.destroy();
  GameState === END;
}

if(coinG.isTouching(player)){
  score = score + 1;
  coinG.destroyEach();
}

if(bullG.isTouching(ufoG)){
  score = score + 10;
  ufoG.destroyEach();
  bullG.destroyEach();
}

}

  spawnCoins();  
  spawnBlacks();
  spawnUfos();
  drawSprites();

  textSize(50);
  fill("cyan");
  strokeWeight(7);
  stroke("pink");
  fill("cyan");
  text("Score: " + score, 100, 100);

}

function spawnBullets(){
bull = createSprite(110, 900);
bull.shapeColor = "gold";
bull.velocityX = 25;
bull.y = player.y;
bull.lifetime = 140;  
bull.addAnimation("bull", bullet);
bull.scale = 0.1;
bullG.add(bull);
}

function spawnBlacks(){
  if(frameCount % 100 === 0){
    black = createSprite(1800, Math.round(random(10, 1000)), 50, 50);
    black.velocityX = -25;
    black.addImage(blaI);
    black.scale = 0.3;
    black.lifetime = 150;
    blackG.add(black);
  }
}

function spawnCoins(){
  if(frameCount % 90 === 0){
    coins = createSprite(1800, Math.round(random(10, 1000)), 50, 50);
    coins.addImage(coinc);
    coins.scale = 0.5;
    coins.velocityX = -25;
    coins.lifetime = 150;   
    coinG.add(coins);
  }
}

function spawnUfos(){
  if(frameCount % 200 === 0){
    ufo = createSprite(1800, Math.round(random(10, 1000)), 50, 50);
    ufo.velocityX = -25;
    ufo.addImage(ufoI);
    ufo.lifetime = 150;
    ufoG.add(ufo);
  }
}