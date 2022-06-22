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
    lastPlacedI: 0,
    lastPlacedJ: 0,
    winVal: 1,
    currPlayer: 0,
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
        this.lastPlacedI = this.colCount[col];
        this.lastPlacedJ = col;
        this.colCount[col] = this.colCount[col] - 1;
    } ,
    checkWinHorizontal: function (startI, startJ, checkCheat){
        /*Initialize Starting Position*/
        let checkI = startI;
        let checkJ = startJ;
        let check = this.board[checkI][checkJ];
        if (typeof(checkCheat) !== "undefined") {
            check = this.players[this.currPlayer];
        }
        let checkCount = 0;
        if (check === 'y') {
            /*Check Left*/
            while (check === 'y') {
                checkCount++;
                checkJ = checkJ - 1;
                check = this.board[checkI][checkJ];
            }
            /*Check Right*/
            checkJ = startJ + 1;
            check = this.board[checkI][checkJ];
            while (check === 'y') {
                checkCount++;
                checkJ = checkJ + 1;
                check = this.board[checkI][checkJ]
            }
            /*Check checkCount*/
            if (checkCount >= this.winVal) {
                return "Win";
            }
            return checkCount;
        }
        else if (check === 'r') {
            /*Check Left*/
            while (check === 'r') {
                checkCount++;
                checkJ = checkJ - 1;
                check = this.board[checkI][checkJ];
            }
            /*Check Right*/
            checkJ = startJ + 1;
            check = this.board[checkI][checkJ];
            while (check === 'r') {
                checkCount++;
                checkJ = checkJ + 1;
                check = this.board[checkI][checkJ]
            }
            /*Check checkCount*/
            if (checkCount >= this.winVal) {
                return "Win";
            }
        }
        else {
            return "Error: Place Empty";
        }
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
gameState.placePiece(5, 0);
*/
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.checkWinHorizontal(gameState.lastPlacedI, gameState.lastPlacedJ));