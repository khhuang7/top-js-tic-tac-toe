function Cell(row, column) {
  let value = 0;
  
  const getIndex = () => {
    return [i, j];
  }

  // keep track of which spaces are vacant vs. which player
  const getValue = () => {
    return value;
  }

  const setValue = (newValue) => {
    value = newValue;
  }

  // add and return a getValue

  return {
    getIndex,
    getValue,
    setValue
  };
}

function Gameboard() {
  // Set up an empty 3x3 grid
  let grid = [];

  const size = 3;
  for (i = 0; i < size; i++) {
    grid[i] = [];
    for (j = 0; j < size; j++) {
      grid[i].push(Cell(i, j));
    }
  }
  // console.log(grid);

  // const getGrid = () => grid;

  const printGrid = () => {
    let gridWithTokens = [];
    // for (i = 0; i < size; i++) {
    //   gridWithTokens[i] = [];
    //   for (j = 0; j < size; j++) {
    //     gridWithTokens[i].push(grid[i][j].getValue());
    //   }
    // }
    gridWithTokens = grid.map((row) =>
      row.map((cell) => cell.getValue())
    );
    return gridWithTokens;
  }

  // add player's symbol to the gameboard
  const  addToken = (token, row, column) => {
    let cell = grid[row][column];
    cell.setValue(token);
  }

  // Return size of the grid (to allow adjustable grid sizing)
  const getSize = () => {
    return size;
  }

  return {
    printGrid,
    addToken,
    getSize
  }
}

function Player(name, token) {
  const getToken = () => token;

  const getName = () => name;

  return {
    getToken,
    getName
  }
}

// const game = Gameboard();
// const player1 = Player("First", "X");
// const player2 = Player("Second", "O");
// console.log(player1.getToken());
// game.addToken(player1.getToken(), 0, 2);
// game.addToken(player2.getToken(), 1, 0);
// game.addToken(player1.getToken(), 1, 2);
// game.printGrid();
// console.log(game.getDimensions());


function GameController() {
  // start or reset the board
  let gameboard;
  let player1;
  let player2;
  let activePlayer;
  let gameOver;

  const startGame = (name1, name2) => {
    gameboard = Gameboard();
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    activePlayer = player1;
    gameOver = false;
  }

  // individual turn: player selects a vacant space; update Gameboard
  const takeTurn = (row, column) => {
    gameboard.addToken(activePlayer.getToken(), row, column);
  }

  // overall gameplay: alternating turns
  const changeTurns = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
  }

  const printNewRound = () => {
    grid = gameboard.printGrid();
    return grid;
  }

  // check for game over 
  const checkGameOver = () => {
    const size = gameboard.getSize();
    console.log(grid);
    
    checkRows:
    for (let i = 0; i < size; i++) {
      // console.log(`row ${i} value: ${grid[i][0]}`);
      if(grid[i][0] === 0) continue;

      for (let j = 1; j < size; j++) {
        // console.log(`row ${i} column ${j} value: ${grid[i][j]}`);
        if (grid[i][0] !== grid[i][j]) continue checkRows;
      }
      console.log(`Game over - row ${i}`);
      gameOver = true;
      return;
    }

    checkColumns:
    for (let j = 0; j < size; j++) {
      // console.log(`column ${j} value: ${grid[0][j]}`);
      if (grid[0][j] === 0) continue;

      for (let i = 1; i < size; i++) {
        // console.log(`row ${i} column ${j} value: ${grid[i][j]}`);
        if (grid[0][j] !== grid[i][j]) continue checkColumns;
      }
      console.log(`Game over - column ${j}`);
      gameOver = true;
      return;
    }

    if(grid[0][0] === 0) return;
    // console.log("checking diagonal left to right");
    checkDiagonalLeftToRight:
    while(gameOver === false) {
      for (let i = 1; i < size; i++) {
        // console.log(`row ${i} column ${i} value: ${grid[i][i]}`);
        if (grid[0][0] !== grid[i][i]) break checkDiagonalLeftToRight;
        
      }
      console.log("Game over - diagonal from left to right");
      gameOver = true;
      return;
    }

    if (grid[0][size - 1] === 0) return;
    // console.log("checking diagonal right to left");
    checkDiagonalRightToLeft:
    while(gameOver === false) {
      for (let i = 1; i < size; i++) {
        // console.log(`row ${i} column ${size - 1 - i} value: ${grid[i][size - 1 - i]}`);
        if (grid[0][size - 1] !== grid[i][size - 1 - i]) break checkDiagonalRightToLeft;
      }
      console.log("Game over - diagonal from right to left");
      gameOver = true;
      return;
    }

    // check if board is full (i.e. game is tied)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === 0) return;
      }
    }
    console.log("Game over - it's a tie");
    gameOver = true;
  }

  // play game: alternate turns until game over, then report a winner
  const playRound = (row, column) => {
    takeTurn(row, column);
    printNewRound();
    checkGameOver();
    changeTurns();
  }

  return {
    printNewRound,
    playRound,
    checkGameOver,
    startGame
  }
}

// const game = GameController();

// console.log("GAME 1: WIN DIAGONAL LEFT TO RIGHT");
// game.startGame();
// game.playRound(2, 2);
// game.playRound(1, 2);
// game.playRound(1, 1);
// game.playRound(2, 1);
// game.playRound(0, 0);


// console.log("GAME 2: WIN MIDDLE COLUMN");
// game.startGame();
// game.playRound(2, 2);
// game.playRound(1, 1);
// game.playRound(1, 2);
// game.playRound(2, 1);
// game.playRound(0, 0);
// game.playRound(0, 1);

// console.log("GAME 3: WIN LAST ROW");
// game.startGame();
// game.playRound(2, 2);
// game.playRound(1, 1);
// game.playRound(2, 1);
// game.playRound(1, 2);
// game.playRound(2, 0);

// console.log("GAME 4: IT'S A TIE");
// game.startGame();
// game.playRound(2, 2);
// game.playRound(1, 1);
// game.playRound(2, 1);
// game.playRound(1, 2);
// game.playRound(1, 0);
// game.playRound(0, 0);
// game.playRound(0, 2);
// game.playRound(2, 0);
// game.playRound(0, 1);


function ScreenController() {
  // reference all the necessary DOM elements
  const gameboardDiv = document.getElementById("gameboard");
  const playerXName = document.getElementById("playerX");
  const playerOName = document.getElementById("playerO");
  const startBtn = document.getElementById("start-btn");
  const game = GameController();

  // start game on button click with player 1 and player 2 names
  const startGame = (event) => {
    event.preventDefault();
    console.log(`X: ${playerXName.value}, O: ${playerOName.value}`);
    game.startGame(playerXName.value, playerOName.value);
    render();
  }

  // render (print a new line for each row, print a new button for each cell)
  const render = () => {
    gameboardDiv.textContent = "";
    const grid = game.printNewRound();
    console.log(grid);
    const size = grid.length;
    for (i = 0; i < size; i++) {
      let row = document.createElement("div");
      row.setAttribute("class", "row");
      for (j = 0; j < size; j++) {
        let button = document.createElement("button");
        button.setAttribute("class", "cell");

        switch (grid[i][j]) {
          case 0:
            console.log("case 0");
            button.dataset.row = i;
            button.dataset.column = j;
            break;
          case "X":
          case "O":
            console.log("symbol");
            button.textContent = grid[i][j];
            break;
        }

        row.appendChild(button);
      }
      gameboardDiv.append(row);
    }
  }

  // play a round if a valid button (empty cell) on the board is clicked
  const boardClickHandler = (event) => {
    // ensure a valid button is clicked
    if (!event.target.dataset.row) return;

    // play round given the row and column
    game.playRound(event.target.dataset.row, event.target.dataset.column);
    render();
  }

  // assign event handlers
  startBtn.addEventListener("click", startGame);
  gameboardDiv.addEventListener("click", boardClickHandler);
}

ScreenController();

/* TO DO:
- Cell button styling
- Active player display
- Game over display 
- Restart button
- Make Xs and Os look nicer
*/