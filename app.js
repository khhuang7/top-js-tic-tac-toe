function Cell(row, column) {
  let value = 0;
  
  const getIndex = () => {
    return [i, j];
  }

  const getValue = () => {
    return value;
  }

  // add and return a getValue

  return {
    getIndex,
    getValue
  };
}

function Gameboard() {
  let grid = [];
  const rows = 3;
  const columns = 3;
  for (i = 0; i < rows; i++) {
    grid[i] = [];
    for (j = 0; j < columns; j++) {
      grid[i].push(Cell(i, j));
    }
  }

  // console.log(grid);
  // keep track of which spaces are vacant vs. which player
  // add player's symbol to the gameboard
  // clear the board
}

// Gameboard();

function Player() {
  // create a player with a name
  // assign the player to a symbol
}

function Gameplay() {
  // start or reset the board
  // individual turn: player selects a vacant space; update Gameboard
  // overall gameplay: alternating turns
  // check for game winner
  // show game over + winner
}

/* TO DO:
- Include logic checking for when the game is over (3 in a row or ties)
- once the game works, create an object to handle the display/DOM - render
- write functions to allow players to add marks to a specific spot on the board using the DOM
- Input names
- Start/restart button
- Results display
*/