let answer;
let range;
let guessCount = 0;

let wins = 0;
let totalGuesses = 0;

let scores = [];
let startTime;
let times = [];

let streak = 0; // Above and beyond: streak tracking

// Above and beyond: sound effects
function playBeep(frequency = 800, duration = 200) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {}
}

let playerName = prompt("Enter your name:") || "Player";
playerName = playerName.trim();
if (!playerName) playerName = "Player";
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

const guessInput = document.getElementById("guess");
const radios = document.querySelectorAll('input[name="level"]');

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

// Dark mode toggle
darkModeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Keyboard support
guessInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !guessBtn.disabled) {
    makeGuess();
  }
});

guessBtn.disabled = true;
giveUpBtn.disabled = true;

document.getElementById("wins").textContent = wins;
document.getElementById("avgScore").textContent = "--";
document.getElementById("fastest").textContent = "--";
document.getElementById("avgTime").textContent = "--";
document.getElementById("streak").textContent = streak;

// DATE
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

// PLAY
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

 guessInput.focus(); // ✅ THIS IS THE FIX
}

// GUESS
function makeGuess() {
 let guess = parseInt(guessInput.value);
 
 if (isNaN(guess) || guess < 1 || guess > range) {
   document.getElementById("msg").textContent = `${playerName}, please enter a number between 1 and ${range}!`;
   guessInput.value = "";
   return;
 }
 
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

   document.getElementById("msg").textContent = `${playerName}, ${msg}`;
 } else {
   guessBtn.disabled = true;

   streak++;

   wins++;
   totalGuesses += guessCount;

   let quality = "You win! Great job!";
   if (guessCount === 1) quality = "You win! Amazing!";
   else if (guessCount <= 3) quality = "You win! Great job!";
   else if (guessCount <= 5) quality = "You win! Good job!";
   else quality = "You win! Nice work!";

   document.getElementById("msg").textContent =
     `${playerName}, ${msg}! ${quality}`;

   updateScore(guessCount);
   updateTimers(new Date().getTime());
   reset();

   document.getElementById("msg").classList.add("success");
   setTimeout(() => document.getElementById("msg").classList.remove("success"), 1000);
   playBeep(800, 300);
 }

 guessInput.value = "";
}

// SCORE
function updateScore(score) {
 document.getElementById("wins").textContent = wins;
 document.getElementById("avgScore").textContent =
   wins > 0 ? (totalGuesses / wins).toFixed(0) : "--";

 scores.push(score);
 scores.sort((a, b) => a - b);

 let items = document.getElementsByName("leaderboard");

 for (let i = 0; i < 3; i++) {
   items[i].textContent = scores[i] !== undefined ? scores[i] : "--";
 }
 
 document.getElementById("streak").textContent = streak;
}

// GIVE UP
function giveUp() {
 streak = 0;

 wins++;
 totalGuesses += range;

 updateScore(range);
 updateTimers(new Date().getTime());

 document.getElementById("msg").textContent =
   `${playerName}, you gave up! The answer was ${answer}`;

 guessBtn.disabled = true;
 giveUpBtn.disabled = true;
 playBtn.disabled = false;

 reset();
}

// TIMER
function updateTimers(endTime) {
 let duration = (endTime - startTime) / 1000;
 times.push(duration);

 let fastest = Math.min(...times);
 let avg = times.reduce((a, b) => a + b, 0) / times.length;

 document.getElementById("fastest").textContent = fastest.toFixed(2);
 document.getElementById("avgTime").textContent = avg.toFixed(2);
}

// RESET
function reset() {
 playBtn.disabled = false;
 guessBtn.disabled = true;
 giveUpBtn.disabled = true;

 radios.forEach(r => r.disabled = false);
}

