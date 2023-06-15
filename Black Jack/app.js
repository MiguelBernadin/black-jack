var deck = [
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'J', value: 10 },
  { name: 'Q', value: 10 },
  { name: 'K', value: 10 },
  { name: 'A', value: 11 }
];

var playerHand = [];
var dealerHand = [];

var startButton = document.getElementById('start-button');
var gameDiv = document.getElementById('game');
var playerHandDiv = document.getElementById('player-hand');
var dealerHandDiv = document.getElementById('dealer-hand');
var hitButton = document.getElementById('hit-button');
var standButton = document.getElementById('stand-button');
var resultDiv = document.getElementById('result');

function startGame() {
  playerHand = [];
  dealerHand = [];
  resultDiv.innerHTML = '';
  
  startButton.classList.add('hidden');
  gameDiv.classList.remove('hidden');
  hitButton.disabled = false;
  standButton.disabled = false;
  
  shuffleDeck();
  dealInitialCards();
  updateHandDivs();
  
  if (getHandValue(playerHand) === 21) {
    endGame();
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealInitialCards() {
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
}

function updateHandDivs() {
  playerHandDiv.innerHTML = '';
  dealerHandDiv.innerHTML = '';
  
  for (let i = 0; i < playerHand.length; i++) {
    playerHandDiv.innerHTML += `${playerHand[i].name} `;
  }
  
  for (let i = 0; i < dealerHand.length; i++) {
    dealerHandDiv.innerHTML += `${dealerHand[i].name} `;
  }
}

function hit() {
  playerHand.push(deck.pop());
  updateHandDivs();
  
  if (getHandValue(playerHand) > 21) {
    endGame();
  }
}

function stand() {
  while (getHandValue(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    updateHandDivs();
  }
  
  endGame();
}

function getHandValue(hand) {
  var value = 0;
  var numAces = 0;
  
  for (let i = 0; i < hand.length; i++) {
    value += hand[i].value;
    
    if (hand[i].name === 'A') {
      numAces++;
    }
  }
  
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  
  return value;
}

function endGame() {
  hitButton.disabled = true;
  standButton.disabled = true;
  
  var playerValue = getHandValue(playerHand);
  var dealerValue = getHandValue(dealerHand);
  
  if (playerValue === dealerValue) {
    resultDiv.innerHTML = 'It\'s a tie!';
  } else if (playerValue > 21) {
    resultDiv.innerHTML = 'You bust! You lose!';
  } else if (dealerValue > 21) {
    resultDiv.innerHTML = 'Dealer busts! You win!';
  } else if (playerValue === 21) {
    resultDiv.innerHTML = 'Blackjack! You win!';
  } else if (dealerValue === 21) {
    resultDiv.innerHTML = 'Dealer has blackjack! You lose!';
  } else if (playerValue > dealerValue) {
    resultDiv.innerHTML = 'You win!';
  } else {
    resultDiv.innerHTML = 'You lose!';
  }
  
  startButton.classList.remove('hidden');
}