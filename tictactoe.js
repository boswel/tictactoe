let elements = document.querySelectorAll(".field");
let symbol = "X";

let a = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

elements.forEach(function(element) {
  element.addEventListener("click", () => {
    if (element.textContent) {return;}
    
    element.textContent = symbol;
    a[element.dataset.y][element.dataset.x] = symbol;

    if (isGameWon()) {
      popupEnd();
    }

    toggleSymbol();
  })  
});


function isGameWon() {
  for (let i = 0; i <= 2; i++) {
    console.log(i, a[i][i], )
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
  console.log(symbol + " won!");
}

function toggleSymbol() {
  if (symbol === "X") {
    symbol = "O";
  }
  else {
    symbol = "X";
  }
}