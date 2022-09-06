// Creating my players and setting up turn changes.
const playerOne = "Player 1";
const playerTwo = "Player 2";
const displayCurrPlayer = document.querySelector("#currPlayer");
let currPlayer = playerOne;

// Setting up my cards
let cardlist = [
  "Charlie_Brown",
  "Lucy",
  "Franklin",
  "Linus",
  "Marcie",
  "Peppermint_Patty",
  "Pigpen",
  "Sally",
  "Schroeder",
  "Snoopy_Woodstock",
];

let gameOver = false;
let cardStack;
let board = []; // Shows outlet of card placement.
// Placing Cards on the board.
let rows = 4;
let columns = 5;

window.onload = function () {
  shuffleCards();
  startGame();
};

// This function will make two of each card in the cardList.
function shuffleCards() {
  cardStack = cardlist.concat(cardlist);
  console.log(cardStack);
  // Make cards shuffle each time window reloads or game is reset.
  for (let c = 0; c < cardStack.length; c++) {
    let b = Math.floor(Math.random() * cardStack.length);
    // Will swap cards in a random spot on board each time game is reloaded.
    let swap = cardStack[c];
    cardStack[c] = cardStack[b];
    cardStack[b] = swap;
  }
  console.log(cardStack);
}

function startGame() {
  // Will create the 4x5 board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardPic = cardStack.pop();
      row.push(cardPic);
      // Create img tags for cards.
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardPic + ".png";
      card.classList.add("card");
      // Will create an event listener here to flip over a card by clicking on it here:

      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  console.log(board);
  //Create a function that will let you see cards before the game starts here:
}

//Create the back of the cards
