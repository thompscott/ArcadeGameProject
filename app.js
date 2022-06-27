/*Button Listeners*/
const button2P = document.getElementById('2pbutton');
button2P.addEventListener('click', settings2);

const button1P = document.getElementById('1pbutton');
button1P.addEventListener('click', settings1);

const buttonR = document.getElementById('resetbutton');
buttonR.addEventListener('click', reset);

const buttonStart = document.getElementById('startbutton');
buttonStart.addEventListener('click', game)

/*Tracks if First Game*/
let firstGame = true;
/*Tracks 1 or 2 Player game*/
let numOfPlayers = 0;


/*Allows User to Input Settings at Beginning of Game*/
function settings1() {
    /*Unhide Settings*/
    const settings = document.getElementById('settings');
    settings.className = '';
    /*Display Message*/
    const message = document.getElementById('message')
        message.innerText = "1 Player Game"
    /*Set Number of Players*/
    numOfPlayers = 0;
    /*Hide Board*/
    const board = document.getElementById('board');
    board.className = 'hidden';
}
function settings2() {
    /*Unhide Settings*/
    const settings = document.getElementById('settings');
    settings.className = '';
    /*Display Message*/
    const message = document.getElementById('message')
        message.innerText = "2 Player Game"
    /*Set Number of Players*/
    numOfPlayers = 1;
    /*Hide Board*/
    const board = document.getElementById('board');
    board.className = 'hidden';
}



/*Main Game Loop*/
function game() {
    /*Hide Settings*/
    const settings = document.getElementById('settings');
    settings.className = 'hidden';
    /*Unhide Board*/
    const board = document.getElementById('board');
    board.className = '';
    
    /*Initial Values*/
    let compPlayer = 0;
    if (numOfPlayers === 0) {
        player1Name = document.getElementById('p1NameInput').value + " (Red)";
        player2Name = "Computer" + " (Yellow)";
        compPlayer = 1;
    }
    else {
        player1Name = document.getElementById('p1NameInput').value + " (Red)";
        player2Name = document.getElementById('p2NameInput').value + " (Yellow)";
        compPlayer = 2;
    }
    const numOfCol = document.getElementById('column').value;
    const numOfRow = document.getElementById('row').value;
    const winVal = 4;

    /*Randomize Start Players*/
    const startPlayer = Math.round(Math.random());

    /*Change Player Names*/
    name1 = document.getElementById('player1name');
    name1.innerText = player1Name;
    name2 = document.getElementById('player2name');
    name2.innerText = player2Name;

    /*Initialize Board*/
    let boardStart = createBoard(numOfRow, numOfCol);
    let colCountStart = createColCount(numOfRow, numOfCol);
    


    /*Initialize object*/ 
    gameState = {
        boardStart: boardStart,
        board: boardStart,
        players: ['r', 'y'],
        colCountStart: [...colCountStart],
        colCount: colCountStart, /*tracks spaces left in column*/
        lastPlacedI: 0, 
        lastPlacedJ: 0,
        winVal: winVal,
        gameOver: false,
        startPlayer: startPlayer,
        compPlayer: compPlayer,
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
        } 
        
    }
    /*Creates Event Listeners For Column if First Game*/
    firstGame = createColList(boardStart, firstGame);

    /*Resets Pieces To White*/
    viewPiece(1);

    /*Displays Turn Message*/
    const message = document.getElementById('message')
    if(gameState.currPlayer === 0) {
        message.innerText = player1Name + " Turn";
    }
    else {
        message.innerText = player2Name + " Turn";
    }

    /*Starts AI Loop For Single Player*/
    if (gameState.compPlayer === 0 || gameState.compPlayer === 1) {
        aILoop();
    }
    
}


/*Supplemental Functions*/

/*Initialization Functions*/


/*Initialize Board Array*/
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

/*Initialize colCount (tracks spaces left in column)*/
function createColCount(rows, cols) {
    let colCount = [];
    for (let i = 0; i < cols; i++) {
        colCount[i] = rows - 1;
    }
    return colCount;
}

/*Initialize Column Event Listeners*/
function createColList(board, firstGame) {
    if (firstGame === true) {
        for (let i = 0; i < board[0].length; i++) {
            let colNum;
            colNum = document.getElementsByTagName('table')[i];
            colNum.addEventListener('click', ()=>{move(i, 1);});
        }
        return  false;
    }
    return false;
}


/*Board Functions*/


/*Allows The Piece To Be Visible The Players*/
function viewPiece(reset) {
    let playNum = gameState.currPlayer
    let spot = document.getElementsByTagName('table')[gameState.lastPlacedJ].getElementsByTagName('td')[gameState.lastPlacedI];
    if (reset !== undefined) {
        for(let i = 0; i < gameState.board.length ; i++) {
            for(let j = 0; j < gameState.board[0].length ; j++) {
                spot = document.getElementsByTagName('table')[j].getElementsByTagName('td')[i];
                spot.className = 'w';
            }
        }
        gameState.currPlayer = gameState.startPlayer;
    }
    else if (playNum === 1) {
        spot.className = gameState.players[playNum];
        gameState.currPlayer = 0;
    }
    else {
        spot.className = gameState.players[playNum];
        gameState.currPlayer = 1;   
    }
    return undefined;
}


/*Resets Current Game*/
function reset() {
    if (firstGame === true) {
        const message = document.getElementById('message')
        message.innerText = "No Game Started: Select New 1-Player or 2-Player Game"
    }
    else {
        /*Resets Board*/
        viewPiece(1);
        gameState.board = createBoard(gameState.boardStart.length , gameState.boardStart[0].length);
        gameState.colCount = [...gameState.colCountStart];
        gameState.currPlayer = gameState.startPlayer;
        if(gameState.gameOver = true && gameState.compPlayer === 1) {
            gameState.gameOver = false;
            aILoop();
        }
        gameState.gameOver = false;
        
        /*Displays Turn Message*/
        const message = document.getElementById('message')
        if(gameState.currPlayer === 0) {
            message.innerText = player1Name + " Turn";
        }
        else {
            message.innerText = player2Name + " Turn";
        }


    }
}


/*Move Function Moves and Checks Play for Win Or Draw*/
function move(col, user) {
    const message = document.getElementById('message');
    /*Check if Player is Allowed to Move*/
    if (gameState.gameOver === false && (gameState.currPlayer !== gameState.compPlayer || user === undefined)) {
        /*Check If Valid Move*/
        const moveTest = gameState.placePiece(col);
        if (moveTest === "Error: Invalid Move") {
            message.innerText = "Invalid Move";
            return 0;
        }
        /*Check If Win*/
        const winTest = checkWin(gameState.board, gameState.lastPlacedI, gameState.lastPlacedJ);
        if (winTest === "Win") {
            if(gameState.currPlayer === 0) {
                message.innerText = "Game Over: " + player1Name + " Wins!";
            }
            else {
                message.innerText = "Game Over: " + player2Name + " Wins!";
            }
            gameState.gameOver = true;
            viewPiece();
            return 0;
        }
        /*Check If Draw*/
        const drawTest = checkDraw(gameState.colCount);
        if (drawTest === "Draw") {
            if(gameState.currPlayer === 0) {
                message.innerText = "Game Over: " + player1Name + " caused a draw!";
            }
            else {
                message.innerText = "Game Over: " + player2Name + " caused a draw";
            }
            gameState.gameOver = true;
            viewPiece();
            return undefined;
        }
        /*Show Piece and Change Player Turn Message*/
        if(gameState.currPlayer === 0) {
            message.innerText = player2Name + " Turn";
        }
        else {
            message.innerText = player1Name + " Turn";
        }
        viewPiece();
        return undefined;
        
    }
    
}


/*gameLogicCode*/


/*Checks For Win Horizontally: Returns "Win" or number in a row*/
function checkWinHorizontal(board, startI, startJ, checkCheat, player) {
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
        check = gameState.players[checkCheat];
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
function checkWinVertical(board, startI, startJ, checkCheat) {
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
        check = gameState.players[checkCheat];
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
function checkWinDiagUp(board, startI, startJ, checkCheat) {
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
        check = gameState.players[checkCheat];
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
function checkWinDiagDown(board, startI, startJ, checkCheat) {
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
        check = gameState.players[checkCheat];
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
function checkWin(board, startI, startJ, checkCheat) {
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


/*AI Logic Code*/


/*AI Loop*/
function aILoop () {
        
    id = setInterval(() => {
        if (gameState.currPlayer === gameState.compPlayer) {
            let col = aIColSelect(gameState.board, gameState.colCount);
            move(col);
        }
        /*Terminates Loop at Game Over*/
        if (gameState.gameOver === true){
            clearInterval(id);
        };
    }, 2000);


}

/*AI Logic Returns Col Number*/
function aIColSelect (board, colCount) {
    /*Determine if Win is Possible*/
    for (let i = 0; i < board[0].length; i++) {
        if (colCount[i] >= 0) {
            const winTest = checkWin(gameState.board, colCount[i], i, 1);
            if (winTest === "Win") {
                
                return i;
            }
        }
    
    }

    /*Determine if Opponent Win is Possible*/
    for (let i = 0; i < board[0].length; i++) {
        if (colCount[i] >= 0) {
            const winTest = checkWin(gameState.board, colCount[i], i, 0);
            if (winTest === "Win") {
                
                return i;
            }
        }
    
    }

     /*Determine Best Move Based on the Sum of The Counts in All Directions*/
     /*Replace With Code Below For Easier Computer Opponent*/
     /*col = Math.round(Math.random() */
     let bestCol = [];
     for (let i = 0; i < board[0].length; i++) {
        
        if (colCount[i] >= 0) {
            const winTest = checkWin(gameState.board, colCount[i], i, 1);
            bestCol[i] = winTest;
        }
    
    }
    biggest = Math.max(...bestCol);
    col = bestCol.indexOf(biggest);
    
    return col;

    /*Easy Mode Code*/
    /*col = Math.round(Math.random() * gameState.board[0].length - 1);
    return col;*/
    
}
