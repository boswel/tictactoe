let gameContainer = document.getElementById("game-container");
let elements = document.querySelectorAll(".field");
let won = document.getElementById("won");
let wonText = document.getElementById("won-text");
let wonButton = document.getElementById("won-button");
let symbol = "X";

let a = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

elements.forEach(function(element) {
  element.addEventListener("click", () => {
    if (isGameWon() || element.textContent) {return;}
    
    element.textContent = symbol;
    a[element.dataset.y][element.dataset.x] = symbol;

    if (isGameWon()) {
      styleFieldsAsOff();
      popupEnd();
    }

    toggleSymbol();
  })  
});


function isGameWon() {
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

function popupEnd() {
  wonText.textContent = symbol + " won the game!";
  won.hidden = false;
}

wonButton.addEventListener("click", () => {
  location.reload();
});

function toggleSymbol() {
  if (symbol === "X") {
    symbol = "O";
  }
  else {
    symbol = "X";
  }
}

function styleFieldsAsOff() {
  elements.forEach(function(element) {
    element.classList.add("off");
  });
}