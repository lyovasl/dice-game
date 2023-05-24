'use strict';

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const playerScoreOne = document.querySelector('#score--0');
const playerScoreTwo = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerCurrent0 = document.querySelector('#current--0');
const playerCurrent1 = document.querySelector('#current--1');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

playerScoreOne.textContent = '0';
playerScoreTwo.textContent = '0';
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer == 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

newGame.addEventListener('click', function () {
  scores = [0, 0];
  diceEl.classList.add('hidden');

  currentScore = 0;

  activePlayer = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  playerScoreOne.textContent = 0;
  playerScoreTwo.textContent = 0;

  playerCurrent0.textContent = currentScore;
  playerCurrent1.textContent = currentScore;
});
