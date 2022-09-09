// Creating my players and setting up turn changes.
let playerOne = "1";
let playerTwo = "2";
const displayCurrPlayer = document.querySelector("#currPlayer");
let currPlayer = playerOne;
let player1Points = Number(
  document.getElementById("player1Points").textContent
);
let player2Points = Number(
  document.getElementById("player2Points").textContent
);

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

let card1Chosen;
let card2Chosen;

let match = new Audio("/Charlie_Brown_cheering_and_clapping.mp3");
let noMatch = new Audio("/Charlie_Brown_Oh_Brother_Sound_Effect.mp3");
let winningSound = new Audio("/Youre_the_Charlie_Browniest.mp3");

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
      // Create an event listener to flip over a card by clicking on it here:
      card.addEventListener("click", chooseCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  console.log(board);
  //Create a function that will let you see cards before the game starts here:
  setTimeout(concealCards, 1000);
}

//Create the back of the cards
function concealCards() {
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.png";
    }
}

function chooseCard() {
  // Make sure card is facing down when selected.
  if (this.src.includes("back")) {
    if (!card1Chosen) {
      card1Chosen = this;
      // Selecting correct placement of card.
      let coords = card1Chosen.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Chosen.src = board[r][c] + ".png";
    } else if (!card2Chosen && this != card1Chosen) {
      card2Chosen = this;

      let coords = card2Chosen.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Chosen.src = board[r][c] + ".png";
      setTimeout(update, 1000);
    }
  }
}

function update() {
  // debugger;
  console.log(card1Chosen, card2Chosen);
  //Player One's turn
  if (currPlayer == playerOne && card1Chosen.src == card2Chosen.src) {
    currPlayer = playerOne;
    displayCurrPlayer.innerText = currPlayer;
    player1Points += 1;
    document.getElementById("player1Points").textContent = player1Points;
    match.play();
  } else if (currPlayer == playerOne && card1Chosen.src != card2Chosen.src) {
    console.log(currPlayer);
    currPlayer = playerTwo;
    displayCurrPlayer.innerText = currPlayer;
    //flips cards back over if they are not a match.
    card1Chosen.src = "back.png";
    card2Chosen.src = "back.png";
    noMatch.play();
  }
  // Player Two's turn
  else if (currPlayer == playerTwo && card1Chosen.src == card2Chosen.src) {
    currPlayer = playerTwo;
    displayCurrPlayer.innerText = currPlayer;
    player2Points += 1;
    document.getElementById("player2Points").textContent = player2Points;
    match.play();
  } else if (currPlayer == playerTwo && card1Chosen.src != card2Chosen.src) {
    console.log(currPlayer);
    currPlayer = playerOne;
    displayCurrPlayer.innerText = currPlayer;
    //flips cards back over if they are not a match.
    card1Chosen.src = "back.png";
    card2Chosen.src = "back.png";
    noMatch.play();
  }
  // Will deselect the cards
  card1Chosen = null;
  card2Chosen = null;
  if (player1Points + player2Points === 10) {
    setWinner();
  }
}

function setWinner() {
  let winner = document.getElementById("winner");
  if (player1Points > player2Points) {
    console.log(player1Points);
    winner.innerHTML = "Player 1 Wins!";
    winningSound.play();
  } else if (player2Points > player1Points) {
    winner.innerHTML = "Player 2 Wins!";
    winningSound.play();
  } else {
    winner.innerHTML = "Draw!";
  }
}
