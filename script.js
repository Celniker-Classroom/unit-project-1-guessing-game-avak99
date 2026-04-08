// ================= STATE =================
let answer;
let range;
let guessCount = 0;

let wins = 0;
let totalGuesses = 0;

let scores = [];

let startTime;
let times = [];

let playerName = prompt("Enter your name:");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();


// ================= ELEMENTS =================
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);


// ================= DATE =================
function getSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";
  return "th";
}

function time() {
  let now = new Date();

  let months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  let day = now.getDate();
  let suffix = getSuffix(day);

  return `${months[now.getMonth()]} ${day}${suffix}, ${now.getFullYear()} ${now.toLocaleTimeString()}`;
}

setInterval(() => {
  document.getElementById("date").textContent = time();
}, 1000);


// ================= PLAY =================
function play() {
  let selected = document.querySelector('input[name="level"]:checked');
  range = parseInt(selected.value);

  answer = Math.floor(Math.random() * range) + 1;

  guessCount = 0;
  startTime = new Date().getTime();

  document.getElementById("msg").textContent =
    `${playerName}, start guessing! Range: 1 - ${range}`;

  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;
}


// ================= GUESS =================
function makeGuess() {
  let guess = parseInt(document.getElementById("guess").value);
  guessCount++;

  let msg = "";

  if (guess > answer) {
    msg = "Too high";
  } else if (guess < answer) {
    msg = "Too low";
  } else {
    msg = "Correct";

    guessBtn.disabled = true;

    wins++;
    totalGuesses += guessCount;

    document.getElementById("wins").textContent = wins;
    document.getElementById("avgScore").textContent =
      (totalGuesses / wins).toFixed(0);

    updateLeaderboard(guessCount);
    updateTimers(new Date().getTime());

    reset();
  }

  if (guess !== answer) {
    let diff = Math.abs(guess - answer);

    if (diff <= 2) msg += " Hot";
    else if (diff <= 5) msg += " Warm";
    else msg += " Cold";
  }

  document.getElementById("msg").textContent =
    `${playerName}, ${msg}`;
}


// ================= LEADERBOARD =================
function updateLeaderboard(score) {
  scores.push(score);
  scores.sort((a, b) => a - b);

  let items = document.getElementsByName("leaderboard");

  for (let i = 0; i < 3; i++) {
    items[i].textContent = scores[i] !== undefined ? scores[i] : "--";
  }
}


// ================= GIVE UP =================
function giveUp() {
  wins++;
  totalGuesses += guessCount;

  document.getElementById("wins").textContent = wins;
  document.getElementById("avgScore").textContent =
    (totalGuesses / wins).toFixed(0);

  updateLeaderboard(range);
  updateTimers(new Date().getTime());

  document.getElementById("msg").textContent =
    `${playerName}, you gave up! The answer was ${answer}`;

  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  playBtn.disabled = false;
}


// ================= TIMER =================
function updateTimers(endTime) {
  let duration = (endTime - startTime) / 1000;
  times.push(duration);

  let fastest = Math.min(...times);
  let avg = times.reduce((a, b) => a + b, 0) / times.length;

  document.getElementById("fastest").textContent = fastest.toFixed(2);
  document.getElementById("avgTime").textContent = avg.toFixed(2);
}


// ================= RESET =================
function reset() {
  playBtn.disabled = false;
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
}