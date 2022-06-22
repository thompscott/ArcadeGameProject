let col = 0; /*values 0-6 for each column*/
/*Initialize Board*/
boardStart = [[null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],]
colCount = [5, 5, 5, 5, 5, 5, 5];/*tracks spaces left in column*/



const gameState = {
    board: boardStart,
    players: ['r', 'y'],
    colCount: colCount, /*tracks spaces left in column*/
    lastPlacedI: 0, 
    lastPlacedJ: 0,
    winVal: 4,
    currPlayer: 0,
    /*Places Piece On The Board*/
    placePiece: function (col) {
        if (this.colCount[col] < 0) {
            return "Error: Invalid Move";
        }
        if (this.players[this.currPlayer] === 'y') {
            this.board[this.colCount[col]][col] = 'y';
        } 
        else {
            this.board[this.colCount[col]][col] = 'r';
        }
        this.lastPlacedI = this.colCount[col];
        this.lastPlacedJ = col;
        this.colCount[col] = this.colCount[col] - 1;
    } ,
    
}
/*Checks For Win Horizontally*/
function checkWinHorizontal (board, startI, startJ, checkCheat){
    /*Initialize Starting Check Position*/
    let checkI = startI;
    let checkJ = startJ;
    let check = board[checkI][checkJ];
    if (checkCheat !== "undefined") {
        check = gameState.players[gameState.currPlayer];
    }
    let checkCount = 0;
    if (check === 'y') {
        /*Check Left*/
        while (check === 'y') {
            checkCount++;
            checkJ = checkJ - 1;
            check = board[checkI][checkJ];
        }
        /*Check Right*/
        checkJ = startJ + 1;
        check = board[checkI][checkJ];
        while (check === 'y') {
            checkCount++;
            checkJ = checkJ + 1;
            check = board[checkI][checkJ]
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === 'r') {
        /*Check Left*/
        while (check === 'r') {
            checkCount++;
            checkJ = checkJ - 1;
            check = board[checkI][checkJ];
        }
        /*Check Right*/
        checkJ = startJ + 1;
        check = board[checkI][checkJ];
        while (check === 'r') {
            checkCount++;
            checkJ = checkJ + 1;
            check = board[checkI][checkJ]
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
    }
    else {
        return "Error: Place Empty";
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
console.log(checkWinHorizontal(gameState.board, gameState.lastPlacedI, gameState.lastPlacedJ, 4));