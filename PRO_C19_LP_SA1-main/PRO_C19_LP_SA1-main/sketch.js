var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()

  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
}

function draw() {
  background(200);
if(gameState==="play"){



  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }
    if(keyDown("space"))
    {
      ghost.velocityY=-5
    }
    ghost.velocityY=ghost.velocityY+0.5

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    spawnDoors()
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
  {
    gameState="end"
    ghost.destroy()  
  }
  }
    if(gameState==="end"){
      text("Game Over",250,250)
    }
    drawSprites()
}
function spawnDoors(){
  if(frameCount%200===0){
 var door=createSprite(200,100)
  door.addImage(doorImg)
  door.velocityY=1
  doorsGroup.add(door)
  door.x=Math.round(random(120,400))

  var climber=createSprite(200,150)
  climber.addImage(climberImg)
  climber.velocityY=1
  climbersGroup.add(climber)
  climber.x=door.x

  ghost.depth=door.depth=
  ghost.depth+=1
  var invisibleBlock=createSprite(200,160)
  invisibleBlock.width=climber.width
  invisibleBlock.height=2
  invisibleBlock.velocityY=1
  invisibleBlock.x=door.x
  invisibleBlock.debug=true
  invisibleBlockGroup.add(invisibleBlock)
  }
}