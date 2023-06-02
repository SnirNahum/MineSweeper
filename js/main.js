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

function onInit(SIZE = 4, MINES = 3) {
  gLevel = { SIZE, MINES };
  mineCount = gLevel.MINES;
  lives = createLives();

  gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    minesLeft: gLevel.MINES,
    // secsPassed: gameTime(),
  };
  score = 0;
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

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < gLevel.SIZE; i++) {
    strHTML += `<tr>`;
    for (var j = 0; j < gLevel.SIZE; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className} " onclick="onCellClicked(${i}, ${j}, this)" 
      oncontextmenu="onCellMarked(${i}, ${j}, this); return false;"></td>`;
    }

    strHTML += `</tr>`;
  }

  const elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function onCellClicked(cellI, cellJ, elCell) {
  if (gGame.isOn) {
    if (board[cellI][cellJ].isMarked) return;
    if (board[cellI][cellJ].isShown) return;
    board[cellI][cellJ].isShown = true;
    gGame.shownCount++;
    var negsCount = MinesNegsCount(cellI, cellJ);
    board[cellI][cellJ].minesAroundCount = negsCount;
    console.log(board);
    if (board[cellI][cellJ].isMine) {
      elCell.classList.add("shownMine");
      elCell.innerHTML = MINE;
      isMine(cellI, cellJ);
    } else if (board[cellI][cellJ].isMine && board[cellI][cellJ].isShown)
      return;

    if (!board[cellI][cellJ].isMine) {
      elCell.innerHTML = negsCount;
      if (negsCount === 0) elCell.innerHTML = EMPTY_CELL;
      elCell.classList.add("shown");
    }
  }
}

function setMines(cell) {
  if (Math.random() > 0.1 && mineCount > 0) {
    cell.isMine = true;
    mineCount--;
  } else {
    cell.isMine = false;
  }
}

function createLives() {
  lives = ["❤️", "❤️", "❤️"];
  var joinedLives = lives.join("");
  var elLives = document.querySelector(".lives");
  elLives.innerHTML = joinedLives;
  return lives;
}

function isMine(cellI, cellJ) {
  lives.pop("");
  gGame.minesLeft--;
  checkGameOver();
  // gLevel.MINES--;
  // checkGameOver();

  var elP = document.querySelector(".lives");
  elP.innerHTML = lives.join("");
}

function restartButton() {
  onInit(gLevel.SIZE, gLevel.MINES);
}

function onCellMarked(i, j, elBtn) {
  if (gGame.isOn) {
    if (board[i][j].isShown) return;
    if (!board[i][j].isMarked && gGame.markedCount !== gLevel.MINES) {
      board[i][j].isMarked = true;
      elBtn.innerHTML = FLAG;
      gGame.markedCount++;
      if (!board[i][j].isShown && board[i][j].isMine) {
        score++;
        checkGameOver();
      }
    } else if (board[i][j].isMarked) {
      board[i][j].isMarked = false;
      elBtn.innerHTML = EMPTY_CELL;
      gGame.markedCount--;

      if (!board[i][j].isShown && board[i][j].isMine) {
        score--;
      }
    }
  }
  scoreHandler();
}

function checkGameOver() {
  console.log(gLevel.MINES,gGame.minesLeft,gGame.markedCount);
  if (!lives.length) {
    alert("game Over");
    gGame.isOn = false;
    return;
  }
  // if (
  //   score === gLevel.MINES ||
  //   gGame.minesLeft === 0 ||
  //   gLevel.MINES === gLevel.re + gGame.markedCount
  // ) 
  {
    alert("You Won!");
    gGame.isOn = false;

    return;
  }
}

function scoreHandler() {
  var Elscore = document.querySelector(".score span");
  Elscore.innerHTML = score;
}
