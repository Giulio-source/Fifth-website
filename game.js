var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameHasBegun = false;
var level = 0;

$(document).keydown(function() {
  if (gameHasBegun === false) {
    gameHasBegun = true;
    nextSequence();
  }
})

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (userClickedPattern.length === gamePattern.length) {

    setTimeout(function() {
      checkAnswer()
    }, 500);
  }

})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  console.log(JSON.stringify(gamePattern));
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
    setTimeout(function() {
      nextSequence()
    }, 400);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  };
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameHasBegun = false;
}
