var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
   milkbottleImg=loadImage("Images/Milk.png");

  }


function setup() {
  database=firebase.database();
  createCanvas(800,400);

  foodObj=new Food();
  foodObj.getFoodStock();

  feed=createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(780,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  dog=createSprite(550,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

}


function draw() {
  background("yellow");
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(25);
  if(lastFed>=12){
    fill("blue");
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     fill("blue")
     text("Last Feed : 12 AM",350,30);
   }else{
     fill("blue");
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  
  drawSprites();
}
function addFoods(){
  foodObj.foodStock+=1;
  
  database.ref('/').update({
    Food:foodObj.foodStock
  })

}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);

  
}