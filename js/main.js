"use strict";

// model
var board;
var gGame;
var gLevel;
var mineCount = 0;
const MINE = "💣";
const FLAG = "🚩";
const EMPTY_CELL = "";

function onInit() {
  gLevel = { SIZE: 5, MINES: 2 };
  gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
  board = buildBoard(board);
  renderBoard(board);
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.SIZE; j++) {
      // board[i][j] = Math.random() > 0.75 ? MINE : ""; // placing mines in random places
      // console.log((board[i][j] = cell));

      var cell = {
        minesAroundCount: MinesNegsCount(), // count mines Around clicked cells
        isShown: false,
        isMine: (board[i][j] = Math.random() > 0.7 ? true : false), // placing mines in random places,
        isMarked: false,
      };
      // if ((i === 1 && j === 1) || (i === 2 && j === 2)) {
      //   cell.isMine = true;
      // }
      // console.log(cell);
      board[i][j] = cell;
      // console.log(board[i][j]);
    }
  }

  setMines(board);
  // var numOfNegs = setMinesNegsCount(board, i, j);
  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < gLevel.SIZE; i++) {
    strHTML += `<tr>`;
    for (var j = 0; j < gLevel.SIZE; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}" onclick="onCellClicked(event,${i},${j},this)">${""}</td>`;
    }

    strHTML += `</tr>`;
  }

  const elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

// function setMines(board) {

//   getMines(board);
// }

function onCellClicked(event, cellI, cellJ, elCell) {
  var negsCount = MinesNegsCount(cellI, cellJ);
  if (!board[cellI][cellJ].isMine) {
    elCell.innerHTML = negsCount;
  }
  checkGameOver(cellI, cellJ);

  // var minesNegsCount = setMinesNegsCount(cellI, cellJ);
  // console.log(minesNegsCount);
  console.log(board);
}

function MinesNegsCount(cellI, cellJ) {
  var negsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gLevel.SIZE) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= gLevel.SIZE) continue;
      if (board[i][j].isMine) negsCount++;
    }
  }

  return negsCount;
}

function setMines(board) {
  var randNumbers = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    randNumbers.push(parseInt(Math.random() * 4));
  }
  console.log(randNumbers);
  console.log(board);
}

function checkGameOver(cellI, cellJ) {
  if (board[cellI][cellJ].isMine) {
    alert("Game Over!!");
  }
}
