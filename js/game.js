var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];


const ME = -1
const AI = +1

function evalute(state) {
    var score = 0

    if (gameOver(state, AI)) {
        score = +1
    } else if (gameOver(state, ME)) {
        score = -1
    } else {
        score = 0
    }

    return score
}

function gameOver(state, player) {
    var win_state = [
        [state[0][0], state[0][1], state[0][2]],
        [state[1][0], state[1][1], state[1][2]],
        [state[2][0], state[2][1], state[2][2]], 
        [state[0][0], state[1][0], state[2][0]], 
        [state[0][1], state[1][1], state[2][1]], 
        [state[0][2], state[1][2], state[2][2]], 
        [state[0][0], state[1][1], state[2][2]], 
        [state[0][2], state[1][1], state[2][0]]
    ];

    for (var i = 0; i < 8; i++) {
        var line = win_state[i]
        var count = 0

        for (var j = 0; j < 3; j++) {
            if (line[j] == player) {
                count++;
            }
        }

        if (count == 3) {
            return true;
        }
    }

    return false;
}

function gameOverAll(state) {
    return gameOver(state, AI) || gameOver(state, ME)
}

function emptyCells(state) {
    var cells = []

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            if (state[x][y] == 0) {
                cells.push([x, y])
            }
        }
    }

    return cells
}

function validMove(x, y) {
    var empties = emptyCells(board)

    try {
        if (board[x][y] == 0) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}
 
function setMove(x, y, player) {
    if (validMove(x, y)) {
        board[x][y] = player
        return true
    } else {
        return false
    }
}

function minmax(state, depth, player) {
    var best

    if (player == AI) {
        best = [-1, -1, -1000]
    } else {
        best = [-1, -1, +1000]
    }

    if (depth == 0 || gameOverAll(state)) {
        var score = evalute(state)
        return [-1, -1, score]
    }

    emptyCells(state).forEach(function (cell) {
        var x = cell[0]
        var y = cell[1]
        state[x][y] = player
        var score = minmax(state, depth - 1, -player)
        state[x][y] = 0
        score[0] = x
        score[1] = y
        
        if (player == AI) {
            if (score[2] > best[2]) {
                best = score
            }
        } else {
            if (score[2] < best[2]) {
                best = score
            }
        }
    })

    return best
}

function aiTurn() {
    var x, y
    var move
    var cell

    if (emptyCells(board).length == 9) {
        x = parseInt(Math.random() * 3)
        y = parseInt(Math.random() * 3)
    } else {
        move = minmax(board, emptyCells(board).length, AI)
        x = move[0]
        y = move[1]
    }

    if (setMove(x, y, AI)) {
        cell = document.getElementById(String(x) + String(y))
        cell.innerHTML = "O"
    }
}

function clickedCell(cell) {
    var button = document.getElementById("btn-restart")
    button.disalbed = true
    var condition = gameOverAll(board) == false && emptyCells(board).length > 0

    if (condition == true) {
        var x = cell.id.split("")[0]
        var y = cell.id.split("")[1]
        var move = setMove(x, y, ME)
    
        if (move == true) {
            cell.innerHTML = "X"
            if (condition) {
                aiTurn()
            }
        }
    
        if (gameOver(board, AI)) {
            var lines
            var cell
            var msg
    
            if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1) {
                lines = [[0, 0], [0, 1], [0, 2]]
            } else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1) {
                lines = [[1, 0], [1, 1], [1, 2]]
            } else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1) {
                lines = [[2, 0], [2, 1], [2, 2]]
            } else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1) {
                lines = [[0, 0], [1, 0], [2, 0]]
            } else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1) {
                lines = [[0, 1], [1, 1], [2, 1]]
            } else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1) {
                lines = [[0, 2], [1, 2], [2, 2]]
            } else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1) {
                lines = [[0, 0], [1, 1], [2, 2]]
            } else if (board[0][2] == 1 && board[1][1] == 1 && board[2][0] == 1) {
                lines = [[0, 2], [1, 1], [2, 0]]
            }
    
            for (var i = 0; i < lines.length; i++) {
                cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]))
                cell.style.color = "red"
            }
    
            msg = document.getElementById("message")
            msg.innerHTML = "You Lose!"
        }
    
        if (emptyCells(board).length == 0 && !gameOverAll(board)) {
            msg = document.getElementById("message")
            msg.innerHTML = "Draw!"
        }
    
        if (gameOverAll(board) == true || emptyCells(board).length == 0) {
            button.value = "Restart!"
            button.disalbed = false
        }
    }
}

function restartBtn(button) {
    if (button.value == "Start") {
        aiTurn()
        button.disalbed = true
    } else if (button.value == "Restart!") {
        var htmlBoard
        var msg

        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                board[x][y] = 0
                htmlBoard = document.getElementById(String(x) + String(y))
                htmlBoard.style.color = "#444"
                htmlBoard.innerHTML = ""
            }
        }

        button.value = "Start"
        msg = document.getElementById("message")
        msg.innerHTML = ""
    }
}