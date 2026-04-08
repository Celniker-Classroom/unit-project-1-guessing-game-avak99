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
let streak = 0;
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

const diffInputs = document.querySelectorAll('input[name="difficulty"]');

// ✅ NEW: dark mode toggle
const darkToggle = document.getElementById("darkModeToggle");

// ==================== DATE ====================
function time() {
  const now = new Date();
  return now.toLocaleString();
}
setInterval(() => dateEl.textContent = time(), 1000);

// ==================== GAME ====================
function getRange() {
  if (document.getElementById("e").checked) return 3;
  if (document.getElementById("m").checked) return 10;
  if (document.getElementById("h").checked) return 100;

  // ✅ custom difficulty
  const custom = Number(document.getElementById("customRange").value);
  return custom > 0 ? custom : 10;
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

  startTime = Date.now();
  msgEl.textContent = `${playerName}, guess 1–${range}`;

  diffInputs.forEach(input => input.disabled = true);
}

// ==================== GUESS ====================
function makeGuess() {
  const guess = Number(guessInput.value);

  // ✅ input validation
  if (isNaN(guess)) {
    msgEl.textContent = "Enter a NUMBER.";
    return;
  }
  if (guess < 1 || guess > range) {
    msgEl.textContent = `Stay between 1 and ${range}`;
    return;
  }

  guesses++;

  if (guess === answer) {
    let quality = "Needs work";
    if (guesses <= 2) quality = "Amazing!";
    else if (guesses <= 5) quality = "Good";

    msgEl.textContent = `Correct! ${quality}`;

    // ✅ sound effect
    new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3").play();

    // ✅ animation
    msgEl.style.transform = "scale(1.2)";
    setTimeout(() => msgEl.style.transform = "scale(1)", 200);

    streak++;
    endRound();
  } else {
    let feedback = guess > answer ? "high" : "low";
    msgEl.textContent = `Too ${feedback}`;
    streak = 0;
  }

  guessInput.value = "";
}

function giveUp() {
  guesses = range;
  msgEl.textContent = `You gave up. Answer: ${answer}`;
  streak = 0;
  endRound();
}

// ==================== END ROUND ====================
function endRound() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  guessInput.disabled = true;

  wins++;
  totalGuesses += guesses;

  scores.push(guesses);
  scores.sort((a,b)=>a-b);

  winsEl.textContent = `Wins: ${wins} | Streak: ${streak} | Win %: ${((wins/totalGames)*100).toFixed(1)}%`;
  avgScoreEl.textContent = `Avg Score: ${(totalGuesses / wins).toFixed(2)}`;

  for (let i = 0; i < 3; i++) {
    leaderboardEls[i].textContent = scores[i] || "--";
  }

  const timeTaken = (Date.now() - startTime) / 1000;
  times.push(timeTaken);
  fastestTime = fastestTime === null ? timeTaken : Math.min(fastestTime, timeTaken);

  fastestEl.textContent = `Fastest: ${fastestTime.toFixed(2)}s`;
  avgTimeEl.textContent = `Avg Time: ${(times.reduce((a,b)=>a+b)/times.length).toFixed(2)}s`;

  diffInputs.forEach(input => input.disabled = false);
}

// ==================== DARK MODE ====================
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ==================== KEYBOARD SUPPORT ====================
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") makeGuess();
});

// ==================== EVENTS ====================
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);