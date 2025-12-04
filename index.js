const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.className = `box box${index+1}`;
  });
  
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let winner = "";

  winningPositions.forEach(position => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      winner = gameGrid[position[0]];
      position.forEach(index => boxes[index].classList.add("win"));
      boxes.forEach(box => box.style.pointerEvents = "none");
    }
  });

  if (winner !== "") {
    gameInfo.innerText = `Winner Player - ${winner}`;
    newGameBtn.classList.add("active");
    return;
  }

  if (gameGrid.every(box => box !== "")) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
