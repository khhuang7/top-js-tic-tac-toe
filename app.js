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

  const printGrid = () => {
    let gridWithTokens = [];
    gridWithTokens = grid.map((row) =>
      row.map((cell) => cell.getValue())
    );
    return gridWithTokens;
  }

  // add player's token to the gameboard
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
    if (gameOver === false) {
      activePlayer = (activePlayer === player1) ? player2 : player1;
    }
  }

  const getActivePlayer = () => activePlayer.getName();

  const getActiveToken = () => activePlayer.getToken();

  const printNewRound = () => {
    grid = gameboard.printGrid();
    return grid;
  }

  // check for game over 
  const checkGameOver = () => {
    const size = gameboard.getSize();
    
    checkRows:
    for (let i = 0; i < size; i++) {
      if(grid[i][0] === 0) continue;

      for (let j = 1; j < size; j++) {
        if (grid[i][0] !== grid[i][j]) continue checkRows;
      }
      gameOver = "won";
      return;
    }

    checkColumns:
    for (let j = 0; j < size; j++) {
      if (grid[0][j] === 0) continue;

      for (let i = 1; i < size; i++) {
        if (grid[0][j] !== grid[i][j]) continue checkColumns;
      }
      gameOver = "won";
      return;
    }

    if(grid[0][0] === 0) return;
    checkDiagonalLeftToRight:
    while(gameOver === false) {
      for (let i = 1; i < size; i++) {
        if (grid[0][0] !== grid[i][i]) break checkDiagonalLeftToRight;
        
      }
      gameOver = "won";
      return;
    }

    if (grid[0][size - 1] === 0) return;
    checkDiagonalRightToLeft:
    while(gameOver === false) {
      for (let i = 1; i < size; i++) {
        if (grid[0][size - 1] !== grid[i][size - 1 - i]) break checkDiagonalRightToLeft;
      }
      gameOver = "won";
      return;
    }

    // check if board is full (i.e. game is tied)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === 0) return;
      }
    }
    gameOver = "tied";
    return;

  }

  // play game: alternate turns until game over, then report a winner
  const playRound = (row, column) => {
    takeTurn(row, column);
    printNewRound();
    checkGameOver();
    changeTurns();
  }

  const gameStatus = () => gameOver;

  return {
    printNewRound,
    playRound,
    startGame,
    getActivePlayer,
    getActiveToken,
    gameStatus
  }
}

function ScreenController() {
  // reference all the necessary DOM elements
  const gameboardDiv = document.getElementById("gameboard");
  const playersDiv = document.getElementById("players");
  const playerXName = document.getElementById("playerX");
  const playerOName = document.getElementById("playerO");
  const startBtn = document.getElementById("start-btn");
  const activePlayerName = document.getElementById("active-player");
  const resultDiv = document.getElementById("result");
  const reportWinner = document.getElementById("report-winner");
  const resetBtn = document.getElementById("reset");
  const game = GameController();

  // start game on button click with player 1 and player 2 names
  const startGame = (event) => {
    event.preventDefault();
    playersDiv.classList.toggle("show");
    game.startGame(playerXName.value, playerOName.value);
    render();
  }

  // print active player name
  const updateActivePlayer = () => {
    activePlayerName.textContent = game.getActivePlayer();
  }

  // render (print a new line for each row, print a new button for each cell)
  const render = () => {
    gameboardDiv.textContent = "";
    const grid = game.printNewRound();
    const size = grid.length;
    for (i = 0; i < size; i++) {
      let row = document.createElement("div");
      row.setAttribute("class", "row");
      for (j = 0; j < size; j++) {
        let button = document.createElement("button");
        button.setAttribute("class", "cell");

        switch (grid[i][j]) {
          case 0:
            button.dataset.row = i;
            button.dataset.column = j;
            break;
          case "X":
          case "O":
            button.textContent = grid[i][j];
            button.disabled = true;
            break;
        }

        row.appendChild(button);
      }
      gameboardDiv.append(row);
    }
    updateActivePlayer();
  }

  // play a round if a valid button (empty cell) on the board is clicked
  const boardClickHandler = (event) => {
    // ensure a valid button is clicked
    if (!event.target.dataset.row) return;

    // play round given the row and column
    game.playRound(event.target.dataset.row, event.target.dataset.column);
    render();

    // Stop game if game over
    if ((game.gameStatus() === "won") || (game.gameStatus() === "tied")) {
      const cellBtns = document.querySelectorAll(".cell");
      cellBtns.forEach((btn) => {
        btn.disabled = true;
      });

    // show results
    if (game.gameStatus() === "won") {
      reportWinner.textContent = `The winner is ${game.getActivePlayer()} (Player ${game.getActiveToken()}).`;
    }

    if (game.gameStatus() === "tied") {
      reportWinner.textContent = `The game is tied.`;
  }

      resultDiv.classList.toggle("show");
    }    
  }

  const resetGame = () => {
    resultDiv.classList.toggle("show");
    playersDiv.classList.toggle("show");
    gameboardDiv.textContent = "";
  }

  // assign event handlers
  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  gameboardDiv.addEventListener("click", boardClickHandler);
}

ScreenController();