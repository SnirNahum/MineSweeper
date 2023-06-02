"use strict";

// model
var board;
var gGame;
var gLevel;
var mineCount;
const MINE = "💣";
const FLAG = "🚩";
const EMPTY_CELL = "";
const gameIsOn = "😃";
const mineClick = "😅";
const gameIsOver = "🤯";
var lives;
var score;
// var intervalId;

function onInit(SIZE = 4, MINES = 2) {
  gLevel = { SIZE, MINES };
  mineCount = gLevel.MINES;
  gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: gameTime(),
  };
  lives = createLives();

  var elLives = document.querySelector(".lives");
  elLives.innerHTML = lives.join("");
  board = buildBoard(board);
  renderBoard(board);
}

function buildBoard() {
  var board = [];
  var cell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
  };
  for (var i = 0; i < gLevel.SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = cell;
      cell = {
        minesAroundCount: MinesNegsCount(), // count mines Around clicked cells
        isShown: false,
        isMine: setMines(board[i][j]), // placing mines in random places,
        isMarked: false,
      };
    }
  }

  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < gLevel.SIZE; i++) {
    strHTML += `<tr>`;
    for (var j = 0; j < gLevel.SIZE; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className} " onclick="onCellClicked(event, ${i}, ${j}, this)" 
      oncontextmenu="onCellMarked(${i}, ${j}, this); return false;"></td>`;
    }

    strHTML += `</tr>`;
  }

  const elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function onCellClicked(event, cellI, cellJ, elCell) {
  if (gGame.isOn) {
    var negsCount = MinesNegsCount(cellI, cellJ);
    board[cellI][cellJ].minesAroundCount = negsCount;
    elCell.innerHTML = !board[cellI][cellJ].isMine ? negsCount : MINE;

    checkGameOver(cellI, cellJ);
    isMine(elCell);
  } else {
    gGame.isOn === false;
  }

  console.log(board);
}

function MinesNegsCount(cellI, cellJ) {
  var negsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gLevel.SIZE) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= gLevel.SIZE) continue;
      if (board[i][j].isMine) {
        negsCount++;
      }
    }
  }

  return negsCount;
}

function setMines(cell) {
  if (Math.random() > 0.7 && mineCount > 0) {
    cell.isMine = true;
    mineCount--;
  } else {
    cell.isMine = false;
  }
}

function checkGameOver() {
  if (lives.length === 0 || gGame.markedCount === gLevel.MINES) {
    var status = lives.length === 0 ? "you lose!" : "you WON!";
    gGame.isOn = false;

    alert(status);
    stopTimer();
    return;
  }
  stopTimer();
  return;
}

function createLives() {
  var lives = [];
  for (var i = 0; i < 3; i++) {
    lives.push("❤️");
  }
  return lives;
}

function isMine(elCell) {
  if (elCell.innerHTML === MINE) {
    lives.pop();
    gLevel.MINES--;
    if (!lives.length) {
      checkGameOver();
    }
  }
  var elP = document.querySelector(".lives");
  elP.innerHTML = lives.join("");
}

function restartButton() {
  score = document.querySelector(".score span");
  score.innerHTML = 0;
  console.log(gLevel);
  // stopTimer()
  onInit(gLevel.SIZE, gLevel.MINES);
}

function onCellMarked(i, j, elBtn) {
  if (gGame.isOn) {
    if (board[i][j].isMarked && board[i][j].isMine) return;
    if (elBtn.innerHTML === EMPTY_CELL) {
      elBtn.innerHTML = FLAG;
      board[i][j].isMarked = true;
      if (board[i][j].isMine) gGame.markedCount++;
    } else if (elBtn.innerHTML === FLAG) {
      elBtn.innerHTML = EMPTY_CELL;
      board[i][j].isMarked = false;
      if (board[i][j].isMine) gGame.markedCount--;
    }
    score = document.querySelector(".score span");
    score.innerHTML = gGame.markedCount;
    checkGameOver();
  }
}
