const GameBoard = (() => {
    const board = [[0,0,0], [0,0,0], [0,0,0]];
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
    }
    const getValueOfSquare = (x,y) => {
        if (board[x][y] === 0) {
            return("");
        } else {
            return(board[x][y]);
        }
    }

    const checkForSolution = () => {
        //check for horizontal solutions
        for (let i = 0; i < board.length; i++) {
            for (let j = 1; j < board.length[0]; j++) {
                if (board[i][j] !== board[i][j-1]) { break;}
            }
            return(true);
        }

        //check for vertical solutions
        for (let j = 0; j < board.length[0]; i++) {
            for (let i = 1; i < board.length; i++) {
                if (board[i][j] !== board[i-1][j]) { break;}
            }
            return(true);
        }

        //check for diagonal solutions (top left to bottom right)
        for (let i = 1; i < board.length-1; i++) {
            if (board[i][i] === board[i-1][i-1] && board[i][i] === board[i+1][i+1]) { return(true); }
        }

        //check for diagonal solutions (top left to bottom right)
        if (board[2][0] === board[1][1] && board[0][2] === board[1][1]) { return(true); }
    }

    return {
        playPosition,
        board,
        getValueOfSquare,
        checkForSolution,
    };
})();

const Player = (playerId) => {
    const play = (x, y) => GameBoard.playPosition(playerId, x, y);

    return {
        play,
    };
}

const Turn = (() => {
    let playerTurn = 1;
    const getPlayerTurn = () => {
        nextTurn();
        return(playerTurn);
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
        //TODO: implement
        console.log("delete board");
    }

    const updateBoard = () => {
        deleteBoard();
        displayBoard();
    }

    return {
        displayBoard,
        updateBoard,
    };
})();

const player1 = Player(1);
console.log(GameBoard.board);
DisplayController.displayBoard();
