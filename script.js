let answer = 0;
let range = 3;
let guesses = 0;
let wins = 0;
let totalGuesses = 0;
let scores = [];
let times = [];
let startTime = 0;
let fastestTime = null;
let totalGames = 0;

const dateEl = document.getElementById("date");
const msgEl = document.getElementById("msg");
const guessInput = document.getElementById("guess");
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const winsEl = document.getElementById("wins");
const avgScoreEl = document.getElementById("avgScore");
const fastestEl = document.getElementById("fastest");
const avgTimeEl = document.getElementById("avgTime");
const leaderboardEls = document.getElementsByName("leaderboard");

const radios = document.querySelectorAll('input[name="level"]');
const customInput = document.getElementById("customRange");
const darkToggle = document.getElementById("darkModeToggle");

function updateDate() {
  const now = new Date();
  dateEl.textContent = now.toLocaleString();
}
setInterval(updateDate, 1000);
updateDate();

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (document.getElementById("custom").checked) {
      customInput.disabled = false;
    } else {
      customInput.disabled = true;
    }
  });
});

function getRange() {
  if (document.getElementById("easy").checked) return 3;
  if (document.getElementById("medium").checked) return 10;
  if (document.getElementById("hard").checked) return 100;

  if (document.getElementById("custom").checked) {
    const val = Number(customInput.value);
    return val > 0 ? val : 10;
  }

  return 10;
}

function play() {
  range = getRange();
  answer = Math.floor(Math.random() * range) + 1;
  guesses = 0;
  totalGames++;

  guessInput.disabled = false;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;

  radios.forEach(r => r.disabled = true);
  customInput.disabled = true;

  startTime = new Date().getTime();

  msgEl.textContent = `Guess a number between 1 and ${range}`;
}

function makeGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > range) {
    msgEl.textContent = `Enter a number between 1 and ${range}`;
    return;
  }

  guesses++;

  if (guess === answer) {
    msgEl.textContent = "Correct!";

    playSound();

    updateStats(guesses);
    endRound();
  } else {
    const diff = Math.abs(guess - answer);

    let temp = "cold";
    if (diff <= 2) temp = "hot";
    else if (diff <= 5) temp = "warm";

    msgEl.textContent = guess > answer ? `Too high (${temp})` : `Too low (${temp})`;
  }

  guessInput.value = "";
}

function playSound() {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
  audio.play();
}

function giveUp() {
  msgEl.textContent = `The answer was ${answer}`;
  endRound();
}

function updateStats(score) {
  wins++;
  totalGuesses += score;

  scores.push(score);
  scores.sort((a, b) => a - b);

  winsEl.textContent = `Wins: ${wins}`;
  avgScoreEl.textContent = `Average Score: ${(totalGuesses / wins).toFixed(2)}`;

  scores.slice(0, 3).forEach((s, i) => {
    leaderboardEls[i].textContent = s;
  });

  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000;

  times.push(timeTaken);
  fastestTime = fastestTime === null ? timeTaken : Math.min(fastestTime, timeTaken);

  fastestEl.textContent = `Fastest: ${fastestTime.toFixed(2)}s`;
  avgTimeEl.textContent = `Average Time: ${(times.reduce((a,b)=>a+b)/times.length).toFixed(2)}s`;
}

function endRound() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  guessInput.disabled = true;

  radios.forEach(r => r.disabled = false);
}

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") makeGuess();
});