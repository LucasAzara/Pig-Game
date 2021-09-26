'use strict';

// functions
function randomGenerator() {
  return Math.trunc(Math.random() * 6) + 1;
}
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player1Element.classList.toggle('player--active');
  player2Element.classList.toggle('player--active');
};

// Selecting elements
const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');
const player1Score = document.getElementById('score--0');
const player2Score = document.getElementById('score--1');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Changing Variables
let playerScores, currentScore, currentPlayer, ongoing;

// initialize Function
const init = function () {
  playerScores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  ongoing = true;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1Element.classList.remove('player--winner');
  player2Element.classList.remove('player--winner');
  player1Element.classList.add('player--active');
  player2Element.classList.remove('player--active');
};

// Run the function
init();

// Starting conditions
player1Score.textContent = 0;
player2Score.textContent = 0;
diceElement.classList.add('hidden');

// Rolling dice functionallity
btnRoll.addEventListener('click', function () {
  if (ongoing) {
    // 1 - Generate Random Number
    const dice = randomGenerator();
    // 2 - Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3 - Check for Rolled 1: if true switch players
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (ongoing) {
    // Add current score of player
    playerScores[currentPlayer] += currentScore;
    //   Show on Screen
    document.getElementById(`score--${currentPlayer}`).textContent =
      playerScores[currentPlayer];
    // Checks if the score is at least 100
    if (playerScores[currentPlayer] >= 100) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      ongoing = false;
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// On new button click, execute init function, which restarts everything
btnNew.addEventListener('click', init);
