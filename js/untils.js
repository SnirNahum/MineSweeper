// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive
// }

function timer() {
  var startTime = Date.now();

  interval = setInterval(function () {
    var elapsedTime = Date.now() - startTime;
    secondsPlayed = document.querySelector(".timer span").innerHTML = (
      elapsedTime / 1000
    ).toFixed(3);
  }, 100);
  document.querySelector(".timer span").innerHTML = 0;
}

function stopTimer() {
  return (interval = clearInterval(interval));
}

function mineExplosionSound(audio) {
  if (audio === "mine") {
    var ExplosionSound = new Audio(
      "sounds/mixkit-arcade-game-explosion-2759.wav"
    );
    ExplosionSound.play();
  }
  if (audio === "victory") {
    var victory = new Audio(
      "sounds/mixkit-animated-small-group-applause-523.wav"
    );
    victory.play();
  }
}

function darkMode() {
  var darkMode = document.querySelector("body");
  darkMode.classList.toggle("darkMode");
}
