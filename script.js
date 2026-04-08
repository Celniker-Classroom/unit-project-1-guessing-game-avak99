// ==================== VARIABLES ====================
let playerName = prompt("Enter your name:");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

let answer = 0;
let range = 3;
let guesses = 0;
let wins = 0;
let totalGuesses = 0;
let scores = [];
let startTime = 0;
let times = [];
let fastestTime = null;

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

// ✅ NEW: difficulty inputs
const diffInputs = document.querySelectorAll('input[name="difficulty"]');

// ==================== DATE & TIME ====================
function time() {
  const now = new Date();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const day = now.getDate();
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  const hours = now.getHours().toString().padStart(2,"0");
  const minutes = now.getMinutes().toString().padStart(2,"0");
  const seconds = now.getSeconds().toString().padStart(2,"0");

  return `${months[now.getMonth()]} ${day}${suffix}, ${now.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

dateEl.textContent = time();
setInterval(() => {
  dateEl.textContent = time();
}, 1000);

// ==================== GAME FUNCTIONS ====================
function getRange() {
  if (document.getElementById("e").checked) return 3;
  if (document.getElementById("m").checked) return 10;
  return 100;
}

function play() {
  range = getRange();
  answer = Math.floor(Math.random() * range) + 1;
  guesses = 0;
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;
  startTime = new Date().getTime();
  msgEl.textContent = `${playerName}, guess a number between 1 and ${range}`;

  // ✅ lock difficulty during round
  diffInputs.forEach(input => input.disabled = true);
}

function makeGuess() {
  const guess = Number(guessInput.value);
  guesses++;
  if (guess === answer) {
    msgEl.textContent = `Correct, ${playerName}! You got it in ${guesses} guesses.`;
    guessBtn.disabled = true;
    guessInput.disabled = true;
    endRound();
  } else {
    let feedback = guess > answer ? "high" : "low";
    const diff = Math.abs(guess - answer);
    if (diff <= 2) feedback += ", hot";
    else if (diff <= 5) feedback += ", warm";
    else feedback += ", cold";
    msgEl.textContent = `Your guess is too ${feedback}. Try again, ${playerName}!`;
  }
  guessInput.value = "";
}

function giveUp() {
  guesses = range;
  msgEl.textContent = `${playerName} gave up. The number was ${answer}. Score set to ${range}.`;
  guessBtn.disabled = true;
  guessInput.disabled = true;
  giveUpBtn.disabled = true;
  endRound();
}

function endRound() {
  playBtn.disabled = false;

  // Update scores & stats
  wins++;
  totalGuesses += guesses;
  scores.push(guesses);
  scores.sort((a,b) => a-b);

  winsEl.textContent = `Total wins: ${wins}`;
  avgScoreEl.textContent = `Average Score: ${(totalGuesses / wins).toFixed(2)}`;

  for (let i = 0; i < 3; i++) {
    leaderboardEls[i].textContent = scores[i] !== undefined ? scores[i] : "--";
  }

  // Update timers
  const endTime = new Date().getTime();
  const roundTime = (endTime - startTime) / 1000;
  times.push(roundTime);
  fastestTime = fastestTime === null ? roundTime : Math.min(fastestTime, roundTime);

  fastestEl.textContent = `Fastest Game: ${fastestTime.toFixed(2)}s`;
  const avgTime = times.reduce((a,b)=>a+b,0)/times.length;
  avgTimeEl.textContent = `Average Time: ${avgTime.toFixed(2)}s`;

  // ✅ unlock difficulty after round
  diffInputs.forEach(input => input.disabled = false);
}

// ==================== EVENT LISTENERS ====================
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);