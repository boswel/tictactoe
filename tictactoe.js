let gameContainer = document.getElementById("game-container");
let elements = document.querySelectorAll(".field");
let end = document.getElementById("end");
let endText = document.getElementById("end-text");
let endButton = document.getElementById("end-button");
let symbol = "X";
let movesPlayed = 0;

let a = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

elements.forEach(function(element) {
  element.addEventListener("click", () => {
    movesPlayed += 1;
console.log(movesPlayed)    
    if (element.textContent) {return;} // do I still need the "isGameWon() || " condition? probably not because of end screen
    
    element.textContent = symbol;
    a[element.dataset.y][element.dataset.x] = symbol;

    if (movesPlayed > 4) {
      if (isGameWon()) {
        styleFieldsAsOff();
        endText.textContent = symbol + " won the game!";
        end.hidden = false;
      }
      else {
        if (movesPlayed === 9) {
          endText.textContent = "It's a draw!";
          end.hidden = false;
        }
      }
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

endButton.addEventListener("click", () => {
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