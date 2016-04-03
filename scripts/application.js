$(document).ready(function() {
  tileListener();
})

function tileListener() {
  $(".tile").on("click",clickedTile());
}

function clickedTile() {

}



// BEGIN BOARD GAME LOGIC//

var board = [["","","","","","",""],["","","","","","",""],["","","","","","",""],["","","","","","",""],["","","","","","",""],["","","","","","",""]];

var height = 6;
var width = 7;

function addPiece(column, piece){
  if (board[0][column]){
    console.log("Cannot add a piece there");
    return false;
  }
  if (!board[5][column]){
    console.log(piece + " piece added to column " + column);
    board[5][column] = piece;
    return (50+column);
  }
  for (var row = 1; row < height; row ++){
    if (board[row][column]){
      console.log(piece + " piece added to column " + column);
      board[row-1][column] = piece;
      return ((row * 10)+column);
    }
  }
}


function checkForWin(){
  for (var row = 0; row < height; row ++){
    for (var column = 0; column < width; column ++){
      var space = board[row][column];
      if (space){
        var checkRows = rowCheckMethod(space, row, column);
        var checkColumns = columnCheckMethod(space, row, column);
        var checkDiags = diagCheckMethod(space, row, column)
        if (checkRows || checkColumns || checkDiags){
          return winner(space);
        }
      }
    }
  }
}

function rowCheckMethod(space, row, column){
  if (row > 2){
    return false;
  }
  var checker = (board[row + 1][column] === space) && (board[row + 2][column] === space) && (board[row + 3][column] === space);
  return checker;
}

function columnCheckMethod(space, row, column){
  var checker = (board[row][column + 1] === space) && (board[row][column + 2] === space) && (board[row][column + 3] === space);
  return checker;
}

function diagCheckMethod(space, row, column){
  return (bckDiagCheckMethod(space, row, column) || fwdDiagCheckMethod(space, row, column));
}

function bckDiagCheckMethod(space, row, column){
  if (row > 2){
    return false
  }
  var backSlash = (board[row + 1][column + 1] === space) && (board[row + 2][column + 2] === space) && (board[row + 3][column + 3] === space);
  return backSlash;
}

function fwdDiagCheckMethod(space, row, column){
  if (row < 3){
    return false
  }
  var forwardSlash = (board[row - 1][column + 1] === space) && (board[row - 2][column + 2] === space) && (board[row - 3][column + 3] === space);
  return forwardSlash;

}

function winner(space){
  return true;
}
