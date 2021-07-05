var pc,monsters;
var pcImg,monstersImg;
var playImg,restartImg;
var edges,restart;
var play,bg1,bg2,bg1Img,bg2Img,obstaclesGroup,obstacle1,obstacle2,obstacle3;
var gameState="start";
var score;
function preload(){
pcImg=loadAnimation("frame_00_delay-0.1s.gif","frame_01_delay-0.1s.gif","frame_02_delay-0.1s.gif","frame_03_delay-0.1s.gif","frame_04_delay-0.1s.gif","frame_05_delay-0.1s.gif","frame_06_delay-0.1s.gif","frame_07_delay-0.1s.gif","frame_08_delay-0.1s.gif","frame_09_delay-0.1s.gif")
monstersImg=loadAnimation("1.gif","2.gif","3.gif","4.gif","5.gif","6.gif","7.gif","8.gif","9.gif","10.gif","11.gif","12.gif","13.gif","14.gif","15.gif","16.gif","17.gif","18.gif","19.gif","20.gif");
playImg=loadImage("Imported piskel.gif");
restartImg=loadImage("RESTART IMG.png")
bg1Img=loadAnimation("den (1).gif","den (2).gif","den (3).gif","den (4).gif","den (5).gif","den (6).gif")
bg2Img=loadImage("bg2.jpg");
obstacle1=loadImage("obstacl1.png");
obstacle2=loadImage("obstacl2.png");
obstacle3=loadImage("obstacl3.png");

}

function setup() {
  createCanvas(1366, 635);
  bg2=createSprite(685,317);
  bg2.addImage(bg2Img);
  


 bg1=createSprite(685,317);
   bg1.addAnimation("bg",bg1Img)
   bg1.scale=1.95
 play = createSprite(683,450,50,30);
  play.addImage(playImg)
  play.scale=0.2
  pc= createSprite(400,500,50,50);
   pc.addAnimation("pc",pcImg);
   pc.scale= 0.4 
   pc.visible=false;
   pc.debug=false;
   pc.setCollider('rectangle',0,0,500,600)
  monsters=createSprite(150,530,50,30)
   monsters.addAnimation("monster",monstersImg)
   monsters.visible=false; 
   monsters.scale=0.7
  score=0;
  
  restart=createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.visible=false;

  edges=createEdgeSprites();

  obstaclesGroup=new Group()
  }
  

function draw() {

  background("black");

  if(gameState==="start"){ 
  textSize(50)
  textFont("Ink Free")
  text("t",300,100
  )
  }
  if(mousePressedOver(play)&&gameState==="start"){
    play.destroy();
    gameState="play"; }
 if(gameState==="play"){
  pc.visible=true;
  monsters.visible=true;
bg1.visible=false;
score = score + Math.round(getFrameRate()/100);
  if(keyDown("space")&&pc.y>200) {
    console.log("working");
    pc.velocityY=-20;
  }
  pc.velocityY=pc.velocityY+0.8;
  spawnObstacles();
  if (obstaclesGroup.isTouching(pc)) {
    gameState="end";
  }
  if (obstaclesGroup.isTouching(monsters)) {
    monsters.velocityY=-20
  }
  monsters.velocityY=monsters.velocityY+0.8;
}
if(gameState==="end"){
restart.visible=true;
    bg1.visible=true;
    pc.visible=false;
    monsters.visible=false;
    obstaclesGroup.destroyEach();
    if (mousePressedOver(restart)) {
      gameState="play";
      restart.visible=false;
    }
}
pc.collide(edges[3])
monsters.collide(edges[3])
  drawSprites();
  text("Score: "+ score, 500,50)
}
function spawnObstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite(1360,height-100,10,40);
    obstacle.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  
}}