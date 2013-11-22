// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function(){

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (typeof params == "undefined" || params == null) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    columns: function() {
      var cols = [];
      var rows = this.rows();
      _(rows).each(function(row){
        _(row).each(function(value, i){
          cols[i] = cols[i] || [];
          cols[i].push(value);
        });
      });
      return cols;
    },

    majorDiagonals: function() {
      var diagonals = [];
      var rows = this.rows();
      var i, j, storage;
      var max = rows.length - 1;
      // completes diagonal from initial value
      var completeDiagonal = function(rows, i, j) {
        storage = [rows[j][i]];
        while (i < max && j < max) {
          i++;
          j++;
          storage.push(rows[j][i]);
        }
        return storage;
      };
      // generate intial values
      diagonals.push(completeDiagonal(rows, 0, 0));
      for (i = 1; i < max; i++) {
        j = 0;
        diagonals.push(completeDiagonal(rows, i, j));
        diagonals.push(completeDiagonal(rows, j, i));
      }
      return diagonals;
    },

    minorDiagonals: function() {
      var diagonals = [];
      var rows = this.rows();
      rows = _(rows).map(function(row) {
        return row.slice(0).reverse();
      });
      var i, j, storage;
      var max = rows.length - 1;
      var completeDiagonal = function(rows, i, j) {
        storage = [rows[j][i]];
        while (i < max && j < max) {
          i++;
          j++;
          storage.push(rows[j][i]);
        }
        return storage;
      };
      // generate intial values
      diagonals.push(completeDiagonal(rows, 0, 0));
      for (i = 1; i < max; i++) {
        j = 0;
        diagonals.push(completeDiagonal(rows, i, j));
        diagonals.push(completeDiagonal(rows, j, i));
      }
      return diagonals;
      // completes diagonal from initial value
      // var completeDiagonal = function(rows, j, i) {
      //   storage = [rows[j][i]];
      //   while (i > 0 && j < max) {
      //     i--;
      //     j++;
      //     storage.push(rows[j][i]);
      //   }
      //   return storage;
      // };
      // // generate intial values
      // diagonals.push(completeDiagonal(rows, 0, max));
      // for (i = 1; i < max; i++) {
      //   j = max;
      //   debugger;
      //   diagonals.push(completeDiagonal(rows, j, i));
      //   j = 0;
      //   diagonals.push(completeDiagonal(rows, i, j));
      // }
      // return diagonals;
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _                     
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _ 
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_ 
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
                                                   
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex){
      return _.filter(rowIndex, function(value){
        return value === 1;
      }).length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(){
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(rows[i])) return true;
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // 
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex){
      // return _.filter(colIndex, function(value){
      //   return value === 1;
      // }).length > 1;
      var chessboard = this.rows();
      var counter = 0;
      for (var i = 0; i < chessboard.length; i++) {
        counter += chessboard[i][colIndex];
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function(){
      var cols = this.get('n');
      for (var i = 0; i < cols; i++) {
        if (this.hasColConflictAt(i)) return true;
      }
      return false; // fixme    },
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // 
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(colIdx){
      // return _.filter(diagonalArr, function(value){
      //   return value === 1;
      // }).length > 1;
      var size = this.get('n');
      var count = 0, rowIdx = 0;
      for (; rowIdx < size && colIdx < size; rowIdx++, colIdx++) {
        if (colIdx < 0) continue;
        var row = this.get(rowIdx);
        count += row[colIdx];
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(){
      var size = this.get('n') - 1;
      for (var i = 1-size; i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) return true;
      }
      return false;
      // var diagonals = this.majorDiagonals();
      // for (var i = 0; i < diagonals.length; i++) {
      //   if (this.hasMajorDiagonalConflictAt(diagonals[i])) return true;
      // }
      // return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // 
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(colIdx){
      // return _.filter(diagonalArr, function(value){
      //   return value === 1;
      // }).length > 1;
      var size = this.get('n');
      var count = 0, rowIdx = 0;
      for (; rowIdx < size && colIdx >= 0; rowIdx++, colIdx--) {
        if (colIdx > size - 1) continue;
        var row = this.get(rowIdx);
        count += row[colIdx];
      }
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function(){
      // var diagonals = this.minorDiagonals();
      // for (var i = 0; i < diagonals.length; i++) {
      //   if (this.hasMinorDiagonalConflictAt(diagonals[i])) return true;
      // }
      // return false;
      debugger;
      var size = this.get('n') - 1;
      for (var i = size + size; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) return true;
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
