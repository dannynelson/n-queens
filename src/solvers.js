/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = new Board({n: n});
  var rows = solution.rows();
  for (var x = 0; x < rows.length; x++) {
    for (var y = 0; y < rows.length; y++) {
      rows[y].splice(x, 1, 1);
      if (solution.hasAnyRooksConflicts()) {
        rows[y].splice(x, 1, 0);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return rows;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  // var chessboard = new Board({n: n});
  // var results = 0;
  // var target = n - 1;

  // var search = function(rowIdx) {
  //   var row = chessboard.get(rowIdx);
  //   for (var colIdx = 0; colIdx < n; colIdx++) {
  //     // add piece
  //     chessboard.togglePiece(rowIdx, colIdx);
  //     // if conflicts...
  //     if (chessboard.hasAnyRooksConflicts()) {
  //       chessboard.togglePiece(rowIdx, colIdx);
  //       continue;
  //     }
  //     // if successful...
  //     if (rowIdx === target) {
  //       results++;
  //     } else {
  //       search(rowIdx + 1);
  //     }
  //     chessboard.togglePiece(rowIdx, colIdx);
  //   }
  // };

  // search(0);
  // return results;

  var xArray = _.range(0, n);
  var resultsArray = [];
  var storageArray = [];
  var findSolution = function(y, xArr) {
    for (var i = 0; i < xArr.length; i++) {
      storageArray.push(xArr[i], y);
      if (y !== 0) {
        xA = xArr.slice(); // make copy
        xA.splice(i, 1);
        findSolution(y-1, xA);
      } else {
        resultsArray.push(storageArray);
      }
      storageArray.pop();
    }
  };
  findSolution(n - 1, xArray);
  return resultsArray.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
//there must be at least one queen in every x and Y
//iterate over x in the next Y, if there's no value, try 

  var chessboard = new Board({n: n});
  // set default
  var result = chessboard.rows();
  var target = n - 1;
  var queens = 0;
  var max = 0;
  var solutionFound = false;
  // if (n === 0) return 1;

  var search = function(rowIdx) {
    var row = chessboard.get(rowIdx);
    for (var colIdx = 0; colIdx < n; colIdx++) {
      // add piece
      chessboard.togglePiece(rowIdx, colIdx);
      // if conflicts...
      if (chessboard.hasAnyQueensConflicts()) {
        chessboard.togglePiece(rowIdx, colIdx);
        continue;
      }
      // if successful...
      if (rowIdx === target) {
        result = chessboard.rows(); // to make a copy
        solutionFound = true;
        return;
      } else {
        search(rowIdx + 1);
      }
      if (solutionFound) return;
      chessboard.togglePiece(rowIdx, colIdx);
    }
  };
  
  search(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
  // return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var chessboard = new Board({n: n});
  var results = 0;
  var target = n - 1;
  // if (n === 0) return 1;

  var search = function(rowIdx) {
    var row = chessboard.get(rowIdx);
    for (var colIdx = 0; colIdx < n; colIdx++) {
      // add piece
      chessboard.togglePiece(rowIdx, colIdx);
      // if conflicts...
      if (chessboard.hasAnyQueensConflicts()) {
        chessboard.togglePiece(rowIdx, colIdx);
        continue;
      }
      // if successful...
      if (rowIdx === target) {
        results++;
      } else {
        search(rowIdx + 1);
      }
      chessboard.togglePiece(rowIdx, colIdx);
    }
  };

  search(0);
  console.log(results);
  return results;
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};
