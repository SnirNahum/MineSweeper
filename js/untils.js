function gBoardSize(boardSize) {
  console.log(boardSize);
  // return boardSize
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive
}

// function gameTime() {
//   var timer = 0;
//   setInterval(function () {
//     timer++;
//     var elP = document.querySelector(".gameTime span");
//     elP.innerText = timer;
//   }, 1000); // Updates the timer every second
// }

// function difficultyLevel(level = "Easy") {
//   if (level.innerHTML === "Easy") {
//     difficulty = 16;
//   }
//   if (level.innerHTML === "Medium") {
//     difficulty = 25;
//   }
//   if (level.innerHTML === "Hard") {
//     difficulty = 36;
//   }
//   return difficulty;
// }
