var gamePattern=[];

var buttonColors=["red","blue","green","yellow"];

var UserClickedPattern=[];

var started=false;
var level=0;
//level changing part





$(document).keypress(function()
{
    if(!started)
    {
        started=true;
        
    
        $("h1").html("level "+level);
        nextSequence();
    }
   
});


$(".btn").click(function()
{
   var userChosenColor=$(this).attr("id");
//    console.log(userChosenColor);
   UserClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
  animatePress(userChosenColor);
  var len=UserClickedPattern.length;
  checkAnswer(len-1);

});

//sequence creation part

function nextSequence()
{
    UserClickedPattern=[];
    level++;
    $("h1").html("level "+level);

    var randomNumber=Math.floor((Math.random()*4));
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  
    // $("#randomChosenColor").fadeToggle("slow");
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


    // var audio= new Audio("sounds/"+randomChosenColor+".mp3");
    // audio.play();

 playSound(randomChosenColor);


    //
   
};
//playing sound part
function playSound(name)
{
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();

};
//animation part
function animatePress(currentColor)
{
   $("#"+currentColor).addClass("pressed");


   setTimeout(function()
{
    $("#"+currentColor).removeClass("pressed");
},100);

};


//answerchecking part
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===UserClickedPattern[currentLevel])
  {
    console.log("success");
     if(gamePattern.length===UserClickedPattern.length)
    {
        setTimeout(function()
    {
        nextSequence();
    },1000);
    }
  }
  else{
    //this is when anybody presses the wrong  in the code
    console.log("wrong");

    $("h1").html("Game Over, Press Any Key to Restart");

    var aud=new Audio("sounds/wrong.mp3");
    aud.play();

    $("body").addClass("game-over")

    setTimeout(function()
  {
    $("body").removeClass("game-over");
  },200);

  //this is to restart the game
  restart();

  };
 
};

//restart section
function restart()
{
    started=false;
    gamePattern=[];
    level=0;
}
