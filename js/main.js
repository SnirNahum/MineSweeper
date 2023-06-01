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
function onInit() {
  gLevel = { SIZE: 4, MINES: 2 };
  mineCount = gLevel.MINES;
  gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    // secsPassed: gameTime(),
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
      strHTML += `<td class="${className}" onclick="onCellClicked(event, ${i}, ${j}, this)" 
      oncontextmenu="onCellMarked(${i}, ${j}, this); return false;">${""}</td>`;
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
    console.log(board[cellI][cellJ].minesAroundCount);
    elCell.innerHTML = !board[cellI][cellJ].isMine ? negsCount : MINE;

    checkGameOver(cellI, cellJ);
    isMine(elCell);
  } else {
    gGame.isOn === false;
  }
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
        // board[i][j].minesAroundCount = negsCount
      }
    }
    console.log(board);
  }

  return negsCount;
}

function setMines(cell) {
  if (Math.random() > 0.1 && mineCount > 0) {
    cell.isMine = true;
    mineCount--;
  } else {
    cell.isMine = false;
  }
}

function checkGameOver(cellI, cellJ) {
  if (lives.length === 0) {
    gGame.isOn = false;
  }
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
    if (!lives.length) {
      checkGameOver();
    }
  }
  var elP = document.querySelector(".lives");
  elP.innerHTML = lives.join("");
}

function restartButton() {
  // console.log(elBtn);
  var elBtn = document.querySelector("button");
  elBtn.innerHTML = gameIsOn;
  // if (!gGame.isOn) {
  //   elBtn.innerHTML = gameIsOver;
  // }
  onInit();
  // return elBtn.innerHTML;
}

function onCellMarked(i, j, elBtn) {
  if (elBtn.innerHTML === FLAG) {
    elBtn.innerHTML = "";
  } else {
    elBtn.innerHTML = FLAG;
  }
  if (
    elBtn.innerHTML === FLAG &&
    board[i][j].isMine === true &&
    board[i][j].isMarked === false
  ) {
    board[i][j].isMarked != board[i][j].isMarked;
    gGame.markedCount++;
    board[i][j].isMarked === false;
  }
  console.log(board);
  console.log(gGame.markedCount);
}
