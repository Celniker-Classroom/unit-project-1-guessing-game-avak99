let answer;
let range;
let guessCount = 0;

let wins = 0;
let totalGuesses = 0;

let scores = [];
let startTime;
let times = [];

let timerInterval;
let elapsedSeconds = 0;

let playerName = prompt("Enter your name:");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");

const guessInput = document.getElementById("guess");
const radios = document.querySelectorAll('input[name="level"]');

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

// ENTER KEY SUPPORT
guessInput.addEventListener("keydown", function(e){
 if (e.key === "Enter") {
   makeGuess();
 }
});

guessBtn.disabled = true;
giveUpBtn.disabled = true;

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

 let hours = now.getHours();
 let minutes = String(now.getMinutes()).padStart(2, "0");
 let seconds = String(now.getSeconds()).padStart(2, "0");

 let ampm = hours >= 12 ? "PM" : "AM";
 hours = hours % 12 || 12;

 return `${months[now.getMonth()]} ${day}${suffix}, ${now.getFullYear()} ${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(() => {
 document.getElementById("date").textContent = time();
}, 1000);

document.getElementById("date").textContent = time();

// ================= TIMER =================
function startTimer() {
 elapsedSeconds = 0;
 document.getElementById("timer").textContent = "Time: 0s";

 clearInterval(timerInterval);

 timerInterval = setInterval(() => {
   elapsedSeconds++;
   document.getElementById("timer").textContent = "Time: " + elapsedSeconds + "s";
 }, 1000);
}

function stopTimer() {
 clearInterval(timerInterval);
}

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

 radios.forEach(r => r.disabled = true);

 startTimer();
}

// ================= GUESS =================
function makeGuess() {
 let guess = parseInt(guessInput.value);
 guessCount++;

 let msg = "";

 if (guess > answer) msg = "Too high";
 else if (guess < answer) msg = "Too low";
 else msg = "Correct";

 if (guess !== answer) {
   let diff = Math.abs(guess - answer);
   if (diff <= 2) msg += " Hot";
   else if (diff <= 5) msg += " Warm";
   else msg += " Cold";
 } else {
   guessBtn.disabled = true;

   wins++;
   totalGuesses += guessCount;

   updateScore(guessCount);
   updateTimers(new Date().getTime());

   stopTimer();
   reset();
 }

 document.getElementById("msg").textContent =
   `${playerName}, ${msg}`;

 guessInput.value = "";
}

// ================= SCORE =================
function updateScore(score) {
 document.getElementById("wins").textContent = wins;

 document.getElementById("avgScore").textContent =
   (totalGuesses / wins).toFixed(0);

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
 totalGuesses += range;

 updateScore(range);
 updateTimers(new Date().getTime());

 stopTimer();

 document.getElementById("msg").textContent =
   `${playerName}, you gave up! The answer was ${answer}`;

 guessBtn.disabled = true;
 giveUpBtn.disabled = true;
 playBtn.disabled = false;

 reset();
}

// ================= TIMER STATS =================
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

 radios.forEach(r => r.disabled = false);
}