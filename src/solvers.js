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
  var factorial = function(n) {
    if (n === 1) return n;
    return n * factorial(n - 1);
  };
  return factorial(n);
  
  // var solutionCount = 0; //fixme
  // var rookCounter = 0;
  // var rows = solution.rows();
  // var singleSolution = function() {
  //   for (var x = 0; x < rows.length; x++) {
  //     for (var y = 0; y < rows.length; y++) {
  //       rows[y].splice(x, 1, 1);
  //       if (solution.hasAnyRooksConflicts()) {
  //         rows[y].splice(x, 1, 0);
  //       } else {
  //         rookCounter++;
  //         if (rookCounter === n) solutionCount++;
  //         singleSolution();
  //         rows[y].splice(x, 1, 0);
  //         rookCounter--;
  //       }
  //     }
  //   }
  // };
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

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
