var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var paredeinvisivel1
var paredeinvisivel2

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,450,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3
  
  paredeinvisivel1=createSprite(1,300,5,600)
  paredeinvisivel2=createSprite(600,300,5,600)
}

function draw() {
  background(200);
  if(gameState=="play"){
  if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("space")){
    ghost.velocityY=-6
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
    
  }
  ghost.bounceOff(paredeinvisivel1)
  ghost.bounceOff(paredeinvisivel2)
  if(ghost.y>600){
    gameState = "gameover"
     }
  if(ghost.isTouching(climbersGroup)){
    gameState = "gameover"
    spookySound.play()
  }
    
}
  thedoors();
  drawSprites();
  gameover();
  
}

function thedoors(){
 if(frameCount%240===0){
 
  var door=createSprite(200,-50);
  door.addImage(doorImg);
  var climber=createSprite(200,10);
  climber.addImage(climberImg);
  door.x=Math.round(random(120,400));
  door.velocityY=1;

  ghost.depth=door.depth+1;

  climber.x=door.x;
  climber.velocityY=1;
  door.lifetime=800;
  climber.lifetime=800;
  doorsGroup.add(door);
  climbersGroup.add(climber);
  climber.setCollider("rectangle",0,0,20,20)
  climber.debug=true
  

 }
}
function gameover(){
  if(gameState=="gameover"){
    ghost.destroy();
    climbersGroup.setVelocityYEach(0);
    climbersGroup.destroyEach();
    doorsGroup.setVelocityYEach(0);
    doorsGroup.destroyEach();
    tower.velocityY=0;
    fill("black");
    textSize(40);
    text("gameover",200,300);
  }
}