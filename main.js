const gameBoard = (() => {
    let squares = Array(9)
    
    

    const addSymbol = (symbol, index) => {
        s = document.getElementById(index) 
        console.log("add symbol run")
        if (squares[index] === undefined) {
            squares[index] = symbol
            console.log("square is empty")
            console.log(symbol)
            
            if (symbol === "X") {
                let x_symbol = document.createElement("img")
                x_symbol.src = "X.svg"
                x_symbol.className = "icon"
                s.appendChild(x_symbol)
            }
            
            else if (symbol === "O") {
                let o_symbol = document.createElement("img")
                o_symbol.src = "O.svg"
                o_symbol.className = "icon"
                s.appendChild(o_symbol)
            }
            gameController.winnerCheck()
            gameController.changeTurn()
        }
    }

    return {
        squares,
        addSymbol
    }
})()

const Player = (symbol) => {
    return {
        symbol
    }
}

let player1 = Player("X")
let player2 = Player("O")

const gameController = (() => {
    let turn = "X"
    let combs = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
    ]
    
    let dialog = document.getElementById("letter-dialog")
    let overlay = document.getElementById("overlay")

    const squareClick = (e) => {
        if (turn === "X") {
            gameBoard.addSymbol(player1.symbol, e.target.id)
        }
        else {
            gameBoard.addSymbol(player2.symbol, e.target.id)
        }
    }

    const changeTurn = () => {
        if (turn === "X") {
            turn = "O"
        }
        else {
            turn = "X"
        }
        let turn_elm = document.getElementById("turn")
        turn_elm.innerText = turn

    }

    const winnerCheck = () => {
        if (!gameBoard.squares.includes(undefined)) {
            console.log("It's a Tie")
            gameOver("Tie")
        }
        for (let comb of combs) {
            if (gameBoard.squares[comb[0]] === gameBoard.squares[comb[1]] && gameBoard.squares[comb[1]] === gameBoard
                .squares[comb[2]] && gameBoard.squares[comb[0]] !== undefined) {
                    console.log(`player${gameBoard.squares[comb[0]]}has won`)
                    gameOver(gameBoard.squares[comb[0]])
                }
        }
    }

    const gameOver = (winner) => {
        if (winner === "Tie") {
            text = document.getElementById("winner-text")
            text.innerText = "It's a Tie"
        }
        overlay.className = "active"
        dialog.classList = "active"
        let winner_icon = document.createElement("img")
        winner_icon.src = winner + ".svg"
        winner_icon.className = "icon-small"

        dialog.insertBefore(winner_icon, dialog.firstChild)
    }

    const resetBoard = () => {
        Array.from(square_buttons).forEach( element =>
            element.replaceChildren())
        overlay.classList.remove("active")
        dialog.classList.remove("active")
        console.log(dialog.children[0])
        dialog.removeChild(dialog.children[0])
        gameBoard.squares.length = 0
    }

    const restart = () => {
        Array.from(square_buttons).forEach( element =>
            element.replaceChildren())
        gameBoard.squares.length = 0
        turn = "X"
        let turn_elm = document.getElementById("turn")
        turn_elm.innerText = turn
    }

    return {
        squareClick,
        changeTurn,
        winnerCheck,
        resetBoard,
        restart

    }
})()

overlay.addEventListener("click", gameController.resetBoard)
square_buttons = document.getElementsByClassName("board-square")
restartBtn = document.getElementById("restart-btn")
restartBtn.addEventListener("click", gameController.restart)
for (let i = 0; i < square_buttons.length; i++) {
    square_buttons[i].addEventListener("click", gameController.squareClick)
}
