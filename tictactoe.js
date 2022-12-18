let elements = document.querySelectorAll(".field");
let symbol = "X";

elements.forEach(function(element) {
  element.addEventListener("click", () => {
    element.textContent = symbol;
    toggleSymbol();
  })  
});

function toggleSymbol() {
  if (symbol === "X") {
    symbol = "O";
  }
  else {
    symbol = "X";
  }
}

