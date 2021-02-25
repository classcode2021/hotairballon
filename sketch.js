var balloon,baalloonImg;
var database;
var position;
var backgroundImg;
var height;

function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png")
  balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png", "Hot Air Ballon-04.png")
}


function setup() {
   database = firebase.database();
   console.log(database)



  createCanvas(1200,900);

 balloon  = createSprite(100,750,50,50);
 balloon.shapeColor = "red"
 balloon.addAnimation("balloon", balloonImg);
 
 

 var balloonposition = database.ref('balloon/height')
     balloonposition.on("value",readHeight,showError)

 
}

function draw() {


  background(backgroundImg);

  stroke("blue");
  textSize(25);
  fill("purple");
  text("use arrow keys to move the balloon",150,150);
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.scale = balloon.scale-0.02
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.scale = balloon.scale+0.01
  }
  drawSprites();
}

function showError(){
console.log("Error in writing to database")
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y

  })

}
function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
  }


