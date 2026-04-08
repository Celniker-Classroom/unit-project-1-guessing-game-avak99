let answer = 0;
let range = 3;
let guesses = 0;

let wins = 0;
let totalGuesses = 0;
let scores = [];

let times = [];
let startTime = 0;

let playerName = "";

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


// ---------- NAME ----------
function formatName(name) {
  if (!name) return "Player";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

playerName = formatName(prompt("Enter your name:"));


// ---------- DATE ----------
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";
  return "th";
}

function time() {
  const now = new Date();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const month = months[now.getMonth()];
  const day = now.getDate();
  const suffix = getDaySuffix(day);
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${month} ${day}${suffix}, ${year} ${hours}:${minutes}:${seconds}`;
}

setInterval(() => {
  dateEl.textContent = time();
}, 1000);


// ---------- RANGE ----------
function getRange() {
  if (document.getElementById("e").checked) return 3;
  if (document.getElementById("m").checked) return 10;
  if (document.getElementById("h").checked) return 100;
  return 10;
}


// ---------- PLAY ----------
function play() {
  range = getRange();
  answer = Math.floor(Math.random() * range) + 1;

  guesses = 0;
  startTime = new Date().getTime();

  msgEl.textContent = `${playerName}, guess a number between 1 and ${range}`;

  guessInput.disabled = false;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;

  radios.forEach(r => r.disabled = true);
}


// ---------- GUESS ----------
function makeGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > range) {
    msgEl.textContent = `Enter a number between 1 and ${range}`;
    return;
  }

  guesses++;

  const diff = Math.abs(guess - answer);

  let proximity = "";
  if (diff <= 2) proximity = "hot";
  else if (diff <= 5) proximity = "warm";
  else proximity = "cold";

  if (guess === answer) {
    msgEl.textContent = `${playerName}, correct! You got it in ${guesses} guesses (${proximity})`;
    endRound();
    updateScore(guesses);
    updateTimers();
  } else {
    let highLow = guess > answer ? "high" : "low";
    msgEl.textContent = `Too ${highLow} (${proximity})`;
  }

  guessInput.value = "";
}


// ---------- GIVE UP ----------
function giveUp() {
  msgEl.textContent = `${playerName}, the answer was ${answer}`;

  updateScore(range);
  updateTimers();
  endRound();
}


// ---------- SCORE ----------
function updateScore(score) {
  wins++;
  totalGuesses += score;

  scores.push(score);
  scores.sort((a, b) => a - b);

  winsEl.textContent = `Wins: ${wins}`;
  avgScoreEl.textContent = `Average Score: ${(totalGuesses / wins).toFixed(2)}`;

  for (let i = 0; i < 3; i++) {
    leaderboardEls[i].textContent = scores[i] || "--";
  }
}


// ---------- TIMER ----------
function updateTimers() {
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000;

  times.push(timeTaken);

  const fastest = Math.min(...times);
  const avg = times.reduce((a, b) => a + b) / times.length;

  fastestEl.textContent = `Fastest: ${fastest.toFixed(2)}s`;
  avgTimeEl.textContent = `Average Time: ${avg.toFixed(2)}s`;
}


// ---------- RESET ----------
function reset() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  guessInput.disabled = true;

  radios.forEach(r => r.disabled = false);
}


// ---------- END ROUND ----------
function endRound() {
  reset();
}


// ---------- EVENTS ----------
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") makeGuess();
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});