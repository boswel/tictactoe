let gameContainer = document.getElementById("game-container");
let elements = document.querySelectorAll(".field");
let end = document.getElementById("end");
let endText = document.getElementById("end-text");
let endButton = document.getElementById("end-button");
let gameState = {
  'symbol': 'X', 
  'movesPlayed': 0, 
  'board': [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
};


elements.forEach(function(element) {
  element.addEventListener("click", () => {
    if (element.textContent) {return;} 
    
    gameState.movesPlayed += 1;
    
    element.textContent = gameState.symbol;
    element.classList.add(gameState.symbol);
    gameState.board[element.dataset.y][element.dataset.x] = gameState.symbol;

    if (gameState.movesPlayed > 4) {
      if (isGameWon(gameState.board)) {
        styleFieldsAsOff();
        endText.textContent = gameState.symbol + " won the game!";
        endText.classList.add(gameState.symbol);
        endButton.classList.add(gameState.symbol);
        end.hidden = false;
        endButton.focus(); 
      }
      else if (gameState.movesPlayed === 9) {
        styleFieldsAsOff();
        endText.textContent = "It's a draw!";
        end.hidden = false;
        endButton.focus(); 
      }
    }    
    
    gameState.symbol = toggleSymbol(gameState.symbol);
    console.log(generateGameTree(gameState.board, gameState.symbol))
  })  
});


function isGameWon(a) {
  for (let i = 0; i <= 2; i++) {
    if (a[i][i]) { // if there is no content in this field, the condition cannot be true
      if (a[i][0] === a[i][1] && a[i][1] === a[i][2] || a[0][i] === a[1][i] && a[1][i] === a[2][i]) {return true;}  // for rows & cols 
    }
  }
  
  if (a[1][1]) {
    if (a[0][0] === a[1][1] && a[1][1] === a[2][2] || a[0][2] === a[1][1] && a[1][1] === a[2][0]) {return true;} // for diagonals
  }
  
  return false;
}

function evaluateGameState(a) {
  
  for (let i = 0; i <= 2; i++) {
    if (a[i][i]) { // if there is no content in this field, the condition cannot be true
      if (a[i][0] === "X" && a[i][1] === "X" && a[i][2] === "X" || 
        a[0][i] === "X" && a[1][i] === "X" && a[2][i] === "X") {return 1;}  // x (player) won 
    }
  }
  
  if (a[1][1] === "X") {
    if (a[0][0] === "X" && a[2][2] === "X" || a[0][2] === "X" && a[2][0] === "X") {return 1;} // x (player) won
  }

  for (let i = 0; i <= 2; i++) {
    if (a[i][i]) {
      if (a[i][0] === "O" && a[i][1] === "O" && a[i][2] === "O" || 
        a[0][i] === "O" && a[1][i] === "O" && a[2][i] === "O") {return -1;}  // O (computer) won 
    }
  }
  
  if (a[1][1] === "O") {
    if (a[0][0] === "O" && a[2][2] === "O" || a[0][2] === "O" && a[2][0] === "O") {return -1;} // O (computer) won
  }

  return 0;
}


function generateNextGameStates(a, symbol) { // a = board, symbol = player whose move it is
  let states = [];
  
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      if (a[y][x] === null) {
        let nextState = JSON.parse(JSON.stringify(a)); // to make a deep copy of the nested array
        nextState[y][x] = symbol;
        states.push(nextState);
      }
    }
  }  
  return states;
}

function generateGameTree(a, symbol) {
  let states = generateNextGameStates(a, symbol);
  symbol = toggleSymbol(symbol);
  let moreStates = []; // TODO: this should not be an array but a collection of nodes

  for (let state of states) {
    moreStates = generateGameTree(state, symbol);
  }

  return moreStates;
}



endButton.addEventListener("click", () => {
  location.reload();
});

function toggleSymbol(symbol) {
  if (symbol === "X") {
    return "O";
  }
  else {
    return "X";
  }
}

function styleFieldsAsOff() {
  elements.forEach(function(element) {
    element.classList.add("off");
  });
}