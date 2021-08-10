const GameBoard = (() => {
    let board = [[0,0,0], [0,0,0], [0,0,0]];
    const checkIfPositionOpen = (x, y) => board[x][y] === 0;
    const playPosition = (playerId, x, y) => {
        if (checkIfPositionOpen(x,y)) {
            board[x][y] = playerId;
            console.log("SUCCESS");
        } else {
            console.log("ERROR");
        }
        DisplayController.updateBoard();
        //check for win and do something about it

        if (checkForSolution()) {
            DisplayController.declareWinner(playerId);
        }
    }
    const getValueOfSquare = (x,y) => {
        if (board[x][y] === 0) {
            return("");
        } else {
            return(board[x][y]);
        }
    }

    const clearBoard = () => {
        board = [[0,0,0], [0,0,0], [0,0,0]];
        DisplayController.updateBoard();
    }

    const checkForSolution = () => {
        //check for horizontal solutions
        for (let i = 0; i < board.length; i++) {
            let matches = 0;
            for (let j = 1; j < board[0].length; j++) {
                if (board[i][j] === 0) { break; }
                if (board[i][j] !== board[i][j-1]) { break; }
                matches += 1;
            }
            if (matches === 2) { return(true); }
        }

        //check for vertical solutions
        for (let j = 0; j < board[0].length; j++) {
            let matches = 0;
            for (let i = 1; i < board.length; i++) {
                if (board[i][j] === 0) { break; }
                if (board[i][j] !== board[i-1][j]) { break; }
                matches += 1;
            }
            if (matches === 2) { return(true); }
        }

        //check for diagonal solutions (top left to bottom right)
        for (let i = 1; i < board.length-1; i++) {
            if (board[i][i] === 0) { break; }
            if (board[i][i] === board[i-1][i-1] && board[i][i] === board[i+1][i+1]) { return(true); }
        }

        //check for diagonal solutions (top left to bottom right)
        if (board[2][0] === board[1][1] && board[0][2] === board[1][1] && board[1][1] !== 0) { return(true); }
    }

    return {
        playPosition,
        board,
        getValueOfSquare,
        checkForSolution,
        clearBoard,
    };
})();

const Player = (playerId) => {
    const play = (x, y) => GameBoard.playPosition(playerId, x, y);

    return {
        play,
    };
}

const Turn = (() => {
    let playerTurn = -1;
    const playerMapping = {
        "1" : "X",
        "-1" : "Y"
    };
    const getPlayerTurn = () => {
        nextTurn();
        console.log(playerMapping[playerTurn]);
        return(playerMapping[playerTurn]);
    }
    const nextTurn = () => {
        playerTurn*=-1;
    }
    return {
        getPlayerTurn
    };
})();

const DisplayController = (() => {
    const displayBoard = () => {
        let body = document.body;
        resetButton();
        let tbl = document.createElement('table');
        tbl.setAttribute("id", "game board");

        for (let i = 0; i < GameBoard.board.length; i++) {
            let tr = tbl.insertRow();
            for (let j = 0; j < GameBoard.board[0].length; j++) {
                let td = tr.insertCell();
                let cell_value = GameBoard.getValueOfSquare(i, j);
                if (cell_value === "") {
                    let button = document.createElement("button");
                    button.innerHTML = "play here";
                    button.addEventListener("click", function() {
                        console.log("play");
                        GameBoard.playPosition(Turn.getPlayerTurn(), i, j);
                        //play?? how to get player?
                    })
                    td.appendChild(button);
                } else {
                    let text = document.createTextNode(cell_value);
                    td.appendChild(text);
                }
            }
        }
        body.appendChild(tbl);
    }

    const deleteBoard = () => { 
        let table = document.getElementById("game board");
            if (table) {
                table.remove();
            }
            console.log("delete board");
        }

    const updateBoard = () => {
        deleteBoard();
        displayBoard();
    }

    const declareWinner = (playerId) => {
        alert("Player " + playerId + " Wins!");
    }

    const resetButton = () => {
        let body = document.body;
        const existingButton = document.getElementById("Reset Button");
        if (!existingButton) {
            let resetButton = document.createElement("button");
            resetButton.innerHTML = "Reset Board";
            resetButton.id = "Reset Button"
            resetButton.addEventListener("click", function() {
                GameBoard.clearBoard();
            })
            body.appendChild(resetButton);
        }
    }

    return {
        displayBoard,
        updateBoard,
        declareWinner,
    };
})();

const player1 = Player(1);
console.log(GameBoard.board);
DisplayController.displayBoard();
