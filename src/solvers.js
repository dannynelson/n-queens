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

  var xArray = _.range(0, n);
  var resultsArray = [];
  var storageArray = [];
  var findSolution = function(y, xArr) {
    for (var i = 0; i < xArr.length; i++) {
      // check for diagonal
      storageArray.push(xArr[i], y);
      if (y !== 0) {
        xA = xArr.slice(); // make copy
        xA.splice(i, 1);
        // do this only if row passes
        findSolution(y-1, xA);
      } else {
        // return result instead of push
        resultsArray.push(storageArray);
      }
      storageArray.pop();
    }
  };

  // create empty matrix
  // toggle queens to match coordinates
  findSolution(n - 1, xArray);
  return resultsArray.length;

  //

  if (n === 0) {
    return undefined;
  }
  var solution = new Board({n: n});
  var originalRows = solution.rows();
  var queens = 0;
  // var y = 0;
  var findSolution = function(rows) {
    for (var x = 0; x < rows.length; x++) {
      for (var y = 0; y < rows.length; y++) {
        if (!rows[y][x]) { //if coordinate already changed, skip over it
          rows[y].splice(x, 1, 1);
          // if there is a conflict, remove it and continue loop
          if (solution.hasAnyQueensConflicts()) {
            rows[y].splice(x, 1, 0);
          // if no conflict, create new branch
          } else {
            queens++;
            if (queens === n) return solution; //answer
            // if (y < n) 
            return findSolution(y++);
            rows[y].splice(x, 1, 0);
            queens--;
          }
        }
      }
    }
  };
  return findSolution(y);


      }
      if(!_.contains(rows[y], 1){

      }
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var factorial = function(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };
  return factorial(n - 1);
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};
