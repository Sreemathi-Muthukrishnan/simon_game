buttonColors=['red','blue','green','yellow'];
userClickedPattern=[];
gamePattern=[];
var level=0;
var started=false;
$(document).on('keydown',function(){
    if(!started)
    {
        started=true;
        nextSequence();
        $("#level-title").text('Level '+level);
    }
   
});
function nextSequence(){
    level=level+1;
    $("#level-title").text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4 );
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
$(".btn").click(function(){
     var userChosenColor=this.id;
     userClickedPattern.push(userChosenColor);
     console.log(userClickedPattern);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length-1);
});
function playSound(ChosenColor){
    var audio = new Audio('sounds/'+ChosenColor+'.mp3');
    audio.play();
}
function animatePress(currentColor)
{
   
     $("#"+currentColor).addClass("pressed");
        
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success!");
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                userClickedPattern=[];
                nextSequence();
            },1000);
        }
    }
    
    else{

        console.log("Wrong!");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text('Game Over, Press Any Key to Restart');
        startOver();
    }
}
function startOver(){
        gamePattern=[];
        userClickedPattern=[];
        level=0;
        started=false;
}