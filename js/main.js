"use strict";

// model
var board;
var gBoardSize;
var mineCount = 0;
const MINE = "💣";
const FLAG = "🚩";
const cell = "";

function onInit() {
  board = buildBoard(board);
  renderBoard(board);
  setMines(board);
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < 4; i++) {
    board.push([]);
    for (var j = 0; j < 4; j++) {
      // board[i][j] = Math.random() > 0.75 ? MINE : ""; // placing mines in random places
      board[i][j] = "";
    }
  }
  setMines(board);
  setMinesNegsCount(board);
  // var numOfNegs = setMinesNegsCount(board, i, j);
  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>`;
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}" onclick="onCellClicked(event,${i},${j},this)">${cell}</td>`;
    }
    strHTML += `</tr>`;
  }
  const elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function setMines(board) {
  board[2][2] = MINE;
  board[1][1] = MINE;
}

function onCellClicked(event, cellI, cellJ, elCell) {
  // console.log(event);
  // document.addEventListener("contextmenu", function (event) {
  //   event.preventDefault();
  // });

  var minesNegsCount = setMinesNegsCount(cellI, cellJ);
  console.log(minesNegsCount);
}

function setMinesNegsCount(cellI, cellJ) {
  var negsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= board[i].length) continue;
      if (board[i][j]) negsCount++;
    }
  }
  return negsCount;
}

// function onCellMarked(elCell)

// function checkGameOver() {}

// function expandShown(board, elCell, i, j) {}
