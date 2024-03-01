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
  const gameboard = Gameboard();
  const player1 = Player("First", "X");
  const player2 = Player("second", "O");
  let activePlayer = player1;
  let gameOver = false;

  // individual turn: player selects a vacant space; update Gameboard
  const takeTurn = (row, column) => {
    gameboard.addToken(activePlayer.getToken(), row, column);
    gameboard.printGrid(); // replace later?
    changeTurns();
  }

  // overall gameplay: alternating turns
  const changeTurns = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
  }

  // check for game over 
  const checkGameOver = () => {
    const size = gameboard.getSize();
    const grid = gameboard.printGrid();
    console.log(grid);
    
    checkRows:
    for (i = 0; i < size; i++) {
      console.log(`row ${i} value: ${grid[i][0]}`);
      if(grid[i][0] === 0) continue;

      for (j = 1; j < size; j++) {
        console.log(`row ${i} column ${j} value: ${grid[i][j]}`);
        if (grid[i][0] !== grid[i][j]) continue checkRows;
      }
      console.log(`Game over - row ${i}`);
      gameOver = true;
      return;
    }

    checkColumns:
    for (j = 0; j < size; j++) {
      console.log(`column ${j} value: ${grid[0][j]}`);
      if (grid[0][j] === 0) continue;

      for (i = 1; i < size; i++) {
        console.log(`row ${i} column ${j} value: ${grid[i][j]}`);
        if (grid[0][j] !== grid[i][j]) continue checkColumns;
      }
      console.log(`Game over - column ${j}`);
      gameOver = true;
      return;
    }

    if(grid[0][0] === 0) return;
    console.log("checking diagonal left to right");
    checkDiagonalLeftToRight:
    while(gameOver === false) {
      for (i = 1; i < size; i++) {
        console.log(`row ${i} column ${i} value: ${grid[i][i]}`);
        if (grid[0][0] !== grid[i][i]) break checkDiagonalLeftToRight;
        
      }
      console.log("Game over - diagonal from left to right");
      gameOver = true;
      return;
    }

    if (grid[0][size - 1] === 0) return;
    console.log("checking diagonal right to left");
    checkDiagonalRightToLeft:
    while(gameOver === false) {
      for (i = 1; i < size; i++) {
        console.log(`row ${i} column ${size - 1 - i} value: ${grid[i][size - 1 - i]}`);
        if (grid[0][size - 1] !== grid[i][size - 1 - i]) break checkDiagonalRightToLeft;
      }
      console.log("Game over - diagonal from right to left");
      gameOver = true;
      return;
    }
  }

  // play game: alternate turns until game over, then report a winner

  return {
    takeTurn,
    checkGameOver
  }
}


console.log("GAME 1: WIN DIAGONAL LEFT TO RIGHT");
const game = GameController();
game.takeTurn(2, 2);
game.takeTurn(1, 2);
game.takeTurn(1, 1);
game.checkGameOver();
game.takeTurn(2, 1);
game.checkGameOver();
game.takeTurn(0, 0);
game.checkGameOver();


console.log("GAME 2: WIN MIDDLE COLUMN");
const game2 = GameController();
game2.takeTurn(2, 2);
game2.takeTurn(1, 1);
game2.takeTurn(1, 2);
game2.checkGameOver();
game2.takeTurn(2, 1);
game2.checkGameOver();
game2.takeTurn(0, 0);
game2.takeTurn(0, 1);
game2.checkGameOver();

console.log("GAME 3: WIN LAST ROW");
const game3 = GameController();
game3.takeTurn(2, 2);
game3.takeTurn(1, 1);
game3.takeTurn(2, 1);
game3.checkGameOver();
game3.takeTurn(1, 2);
game3.checkGameOver();
game3.takeTurn(2, 0);
game3.checkGameOver();

/* TO DO:
- Include logic checking for when the game is over (3 in a row or ties)
- once the game works, create an object to handle the display/DOM - render
- write functions to allow players to add marks to a specific spot on the board using the DOM
- Input names
- Start/restart button
- Results display
*/