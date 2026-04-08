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
const diffInputs = document.querySelectorAll('input[name="level"]');
const darkToggle = document.getElementById("darkModeToggle");

function getSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";
  return "th";
}

function time() {
  const now = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let day = now.getDate();
  return `${months[now.getMonth()]} ${day}${getSuffix(day)}, ${now.getFullYear()} ${now.toLocaleTimeString()}`;
}

setInterval(() => dateEl.textContent = time(), 1000);

function getRange() {
  const custom = document.getElementById("customRange").value;

  if (custom !== "" && Number(custom) > 0) {
    return Number(custom);
  }

  if (document.getElementById("e").checked) return 3;
  if (document.getElementById("m").checked) return 10;
  if (document.getElementById("h").checked) return 100;

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

  diffInputs.forEach(i => i.disabled = true);

  startTime = new Date().getTime();

  msgEl.textContent = `${playerName}, guess a number between 1 and ${range}`;
}

function makeGuess() {
  const guess = Number(guessInput.value);

  if (isNaN(guess)) {
    msgEl.textContent = "Enter a number";
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

    msgEl.textContent = `Correct ${playerName}! ${quality}`;

    new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3").play();

    msgEl.classList.add("pop");
    setTimeout(() => msgEl.classList.remove("pop"), 300);

    streak++;
    updateScore(guesses);
    updateTimers(new Date().getTime());
    reset();

  } else {
    let feedback = guess > answer ? "high" : "low";
    let diff = Math.abs(guess - answer);

    let temp = "cold";
    if (diff <= 2) temp = "hot";
    else if (diff <= 5) temp = "warm";

    msgEl.textContent = `Too ${feedback} (${temp})`;
    streak = 0;
  }

  guessInput.value = "";
}

function giveUp() {
  msgEl.textContent = `You gave up. Answer was ${answer}`;
  streak = 0;

  updateScore(range);
  updateTimers(new Date().getTime());
  reset();
}

function updateScore(score) {
  wins++;
  totalGuesses += score;

  scores.push(score);
  scores.sort((a,b)=>a-b);

  winsEl.textContent = `Wins: ${wins} | Streak: ${streak} | Win %: ${((wins/totalGames)*100).toFixed(1)}%`;
  avgScoreEl.textContent = `Average Score: ${(totalGuesses / wins).toFixed(2)}`;

  for (let i = 0; i < 3; i++) {
    leaderboardEls[i].textContent = scores[i] || "--";
  }
}

function updateTimers(endMs) {
  let timeTaken = (endMs - startTime) / 1000;
  times.push(timeTaken);

  fastestTime = fastestTime === null ? timeTaken : Math.min(fastestTime, timeTaken);

  fastestEl.textContent = `Fastest: ${fastestTime.toFixed(2)}`;
  avgTimeEl.textContent = `Average Time: ${(times.reduce((a,b)=>a+b)/times.length).toFixed(2)}`;
}

function reset() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  guessInput.disabled = true;

  diffInputs.forEach(i => i.disabled = false);
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") makeGuess();
});

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);