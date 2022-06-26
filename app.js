/*Initial Values*/
const player1Name = "Player 1" + " (Red)";
const player2Name = "Player 2" + " (Yellow)";
const numOfCol = 7;
const numOfRow = 6;
const winVal = 4;
const startPlayer = 1;


/*Initialize Board*/
function createBoard(rows, cols) {
    let board = [];
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
/*Initialize colCount*/
function createColCount(rows, cols) {
    let colCount = [];
    for (let i = 0; i < cols; i++) {
        colCount[i] = rows - 1;
    }
    return colCount;
}
let boardStart = createBoard(numOfRow, numOfCol);
let colCount = createColCount(numOfRow, numOfCol);



const gameState = {
    board: boardStart,
    players: ['r', 'y'],
    colCount: colCount, /*tracks spaces left in column*/
    lastPlacedI: 0, 
    lastPlacedJ: 0,
    winVal: 4,
    currPlayer: startPlayer,
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


/*Initialize Column Event Listeners*/
function createColList() {
    for (let i = 0; i < gameState.board[0].length; i++) {
        let colNum = [];
        colNum[i] = document.getElementsByTagName('table')[i];
        colNum[i].addEventListener('click', ()=>{move(i);});
    }
    
}
/*Iitialize Button Event Listeners*/

createColList();





/*Code to access and change individual cells & click
document.getElementsByTagName('table')[3].getElementsByTagName('td')[1].className = 'red';*/


/*Move Function*/
function move (col) {
    message = document.getElementById('message');
    
    /*Check If Valid Move*/
    const moveTest = gameState.placePiece(col);
    if (moveTest === "Error: Invalid Move") {
        message.innerText = "Invalid Move";
        return undefined;
    }
    /*Check If Win*/
    const winTest = checkWin(gameState.board, gameState.lastPlacedI, gameState.lastPlacedJ);
    if (winTest === "Win") {
        if(gameState.currPlayer === 0) {
            message.innerText = player1Name + " Wins!";
        }
        else {
            message.innerText = player2Name + " Wins!";
        }
        viewPiece();
        return undefined;
    }
    /*Check If Draw*/
    const drawTest = checkDraw(gameState.colCount);
    if (drawTest === "Draw") {
        if(gameState.currPlayer === 0) {
            message.innerText = player1Name + " caused a draw!";
        }
        else {
            message.innerText = player2Name + " caused a draw";
        }
        viewPiece();
        return undefined;
    }
    viewPiece();
    return undefined;
}


/*Allows The Piece To Be Visible The Players*/
function viewPiece(reset) {
    let playNum = gameState.currPlayer
    let spot = document.getElementsByTagName('table')[gameState.lastPlacedJ].getElementsByTagName('td')[gameState.lastPlacedI];
    if (reset) {
        spot.className = '';
        gameState.currPlayer = startPlayer;
    }
    if (playNum === 1) {
        spot.className = gameState.players[playNum];
        gameState.currPlayer = 0;
    }
    else {
        spot.className = gameState.players[playNum];
        gameState.currPlayer = 1;   
    }
    return undefined;
}


/*gameLogicCode*/


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