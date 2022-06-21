let col = 0; /*values 0-6 for each column*/
const colCount =[5, 5, 5, 5, 5, 5, 5]; /*tracks spaces left in column*/

boardStart = [[null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],]

const currBoard = boardStart;


const gameState = {
    board: boardStart,
    players: ['r', 'y'],
    colCount: colCount,
    placePiece: function (col, player) {
        if (this.colCount[col] < 0) {
            return "Error: Invalid Move";
        }
        if (this.players[player] === 'y') {
            this.board[this.colCount[col]][col] = 'y';
        } 
        else {
            this.board[this.colCount[col]][col] = 'r';
        }
        this.colCount[col] = this.colCount[col] - 1;
    } 
}



/*Testing*/
/*
console.log(gameState.board);
gameState.placePiece(5, 0);
console.log(gameState.board);
gameState.placePiece(5, 0);
console.log(gameState.board);
gameState.placePiece(5, 0);
console.log(gameState.board);
gameState.placePiece(5, 1);
console.log(gameState.board);
gameState.placePiece(5, 0);
console.log(gameState.board);
gameState.placePiece(5, 0);
console.log(gameState.board);
gameState.placePiece(5, 0);
console.log(gameState.board);
gameState.placePiece(5, 0);*/
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));