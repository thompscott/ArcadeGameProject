let col = 0; /*values 0-6 for each column*/
/*Initialize Board*/
boardStart = [[null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null],]
let colCount = [5, 5, 5, 5, 5, 5, 5];/*tracks spaces left in column*/



const gameState = {
    board: boardStart,
    players: ['r', 'y'],
    colCount: colCount, /*tracks spaces left in column*/
    lastPlacedI: 0, 
    lastPlacedJ: 0,
    winVal: 4,
    currPlayer: 1,
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


/*Checks For Win Horizontally: Returns "Win" or number in a row*/
function checkWinHorizontal (board, startI, startJ, checkCheat){
    /*Initialize Starting Check Position*/
    let checkI = startI;
    let checkJ = startJ;
    let check = 0;
    let checkCount = 0;
    if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
        check = board[checkI][checkJ];
    }
    else {
        check = 0;
    }
    if (checkCheat !== undefined) {
        check = gameState.players[gameState.currPlayer];
    }
    if (check === 'y') {
        /*Check Left*/
        while (check === 'y') {
            checkCount++;
            checkJ = checkJ - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
                console.log(check);
            }
            else {
                check = 0;
            }
        }
        /*Check Right*/
        checkJ = startJ + 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'y') {
            checkCount++;
            checkJ = checkJ + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
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
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Right*/
        checkJ = startJ + 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'r') {
            checkCount++;
            checkJ = checkJ + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === null) {
        return "Error: Place Empty";
    }
    else {
        return "Error: Out of Bounds";
    }
}

/*Checks For Win Vertically: Returns "Win" or number in a row*/
function checkWinVertical (board, startI, startJ, checkCheat){
    /*Initialize Starting Check Position*/
    let checkI = startI;
    let checkJ = startJ;
    let check = 0;
    let checkCount = 0;
    if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
        check = board[checkI][checkJ];
    }
    else {
        check = 0;
    }
    if (checkCheat !== undefined) {
        check = gameState.players[gameState.currPlayer];
    }
    if (check === 'y') {
        /*Check Down*/
        while (check === 'y') {
            checkCount++;
            checkI = checkI + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Up*/
        checkI = startI - 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'y') {
            checkCount++;
            checkI = checkI - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === 'r') {
        /*Check Down*/
        while (check === 'r') {
            checkCount++;
            checkI = checkI + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Up*/
        checkI = startI - 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'r') {
            checkCount++;
            checkI = checkI - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === null) {
        return "Error: Place Empty";
    }
    else {
        return "Error: Out of Bounds";
    }
}


/*Checks For Win Diagonally Up: Returns "Win" or number in a row*/
function checkWinDiagUp (board, startI, startJ, checkCheat){
    /*Initialize Starting Check Position*/
    let checkI = startI;
    let checkJ = startJ;
    let check = 0;
    let checkCount = 0;
    if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
        check = board[checkI][checkJ];
    }
    else {
        check = 0;
    }
    if (checkCheat !== undefined) {
        check = gameState.players[gameState.currPlayer];
    }
    if (check === 'y') {
        /*Check Down, Left*/
        while (check === 'y') {
            checkCount++;
            checkI = checkI + 1;
            checkJ = checkJ - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Up, Right*/
        checkI = startI - 1;
        checkJ = startJ + 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'y') {
            checkCount++;
            checkI = checkI - 1;
            checkJ = checkJ + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === 'r') {
        /*Check Down, Left*/
        while (check === 'r') {
            checkCount++;
            checkI = checkI + 1;
            checkJ = checkJ - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Up, Right*/
        checkI = startI - 1;
        checkJ = startJ + 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'r') {
            checkCount++;
            checkI = checkI - 1;
            checkJ = checkJ + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === null) {
        return "Error: Place Empty";
    }
    else {
        return "Error: Out of Bounds";
    }
}

/*Checks For Win Diagonally Down: Returns "Win" or number in a row*/
function checkWinDiagDown (board, startI, startJ, checkCheat){
    /*Initialize Starting Check Position*/
    let checkI = startI;
    let checkJ = startJ;
    let check = 0;
    let checkCount = 0;
    if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
        check = board[checkI][checkJ];
    }
    else {
        check = 0;
    }
    if (checkCheat !== undefined) {
        check = gameState.players[gameState.currPlayer];
    }
    if (check === 'y') {
        /*Check Down, Right*/
        while (check === 'y') {
            checkCount++;
            checkI = checkI + 1;
            checkJ = checkJ + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Up, Left*/
        checkI = startI - 1;
        checkJ = startJ - 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'y') {
            checkCount++;
            checkI = checkI - 1;
            checkJ = checkJ - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === 'r') {
        /*Check Down, Right*/
        while (check === 'r') {
            checkCount++;
            checkI = checkI + 1;
            checkJ = checkJ + 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check Up, Left*/
        checkI = startI - 1;
        checkJ = startJ - 1;
        if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
            check = board[checkI][checkJ];
        }
        else {
            check = 0;
        }
        while (check === 'r') {
            checkCount++;
            checkI = checkI - 1;
            checkJ = checkJ - 1;
            if ((checkI >= 0 && checkI < board.length) || (checkJ >= 0 && checkJ < board.length[0])) {
                check = board[checkI][checkJ];
            }
            else {
                check = 0;
            }
        }
        /*Check checkCount*/
        if (checkCount >= gameState.winVal) {
            return "Win";
        }
        return checkCount;
    }
    else if (check === null) {
        return "Error: Place Empty";
    }
    else {
        return "Error: Out of Bounds";
    }
}

/*Checks For Win In All Directions: Returns "Win" or sum of counts*/
function checkWin (board, startI, startJ, checkCheat) {
    let countSum = 0;
    let horizontal = checkWinHorizontal(board, startI, startJ, checkCheat);
    if (horizontal === "Win") {
        return horizontal;
    }
    else if(typeof(horizontal) === "number") {
        countSum = countSum + horizontal;
    }
    else {
        return "Error: Horizontal";
    }
    let diagUp = checkWinDiagUp(board, startI, startJ, checkCheat);
    if (diagUp === "Win") {
        return diagUp;
    }
    else if(typeof(diagUp) === "number") {
        countSum = countSum + diagUp;
    }
    else {
        return "Error: DiagUp";
    }
    let diagDown = checkWinDiagDown(board, startI, startJ, checkCheat);
    if (diagDown === "Win") {
        return diagDown;
    }
    else if(typeof(diagDown) === "number") {
        countSum = countSum + diagDown;
    }
    else {
        return "Error: DiagDown";
    }
    let vertical = checkWinVertical(board, startI, startJ, checkCheat);
    if (vertical === "Win") {
        return vertical;
    }
    else if(typeof(vertical) === "number"){
        countSum = countSum + vertical;
    }
    else {
        return "Error: Vertical";
    }
    return countSum;
}

/*Checks For Draw: Returns "Draw" or "Not Draw"*/
function checkDraw(colCount) {
    const columns = [];
    for (let i = 0; i < colCount.length; i++){
        if (colCount[i] >= 0) {
            return "Not Draw";
        }
    }
    return "Draw";
}
function createBoard(rows, cols) {
    let board = [];
    let row = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
    }
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board [i] [j] = null;
            
        }
    }
    return board;
}
boardStart = createBoard(6, 7);
console.log(boardStart);
console.log("Welcome to Programiz!");
/*Testing*/
boardTest = [['r', 'y', null, null, null, 'r', null],
['r', null, 'r', 'r', 'r', null, null],
['r', null, null, 'y', null, null, null],
['r', null, 'y', 'r', 'y', null, null],
[null, 'r', null, 'r', null, 'r', null],
['y', 'y', null, null, 'y', 'y', 'y']]

colCount = [-1, -1, -1, -1, -1, -1, 0];
console.log(checkDraw(colCount))
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
/*
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
console.log(gameState.placePiece(5, 0));
*/
boardStart[3][2] = 'y';
console.log(boardStart);
console.log(checkWinHorizontal(boardStart, 2, 3));