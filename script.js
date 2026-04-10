let answer;
let range;
let guessCount = 0;

let wins = 0;
let totalGuesses = 0;

let scores = [];
let startTime;
let times = [];

let streak = 0;

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

    oscillator.start();
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

darkModeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

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

function updateThermometer(diff, maxRange) {
  let fill = document.getElementById("thermoFill");
  let label = document.getElementById("thermoLabel");

  let percent = Math.max(0, 100 - (diff / maxRange) * 100);

  let color = "#3498db";
  let text = "Cold ❄️";

  if (diff <= 2) {
    color = "#ff2d55";
    text = "🔥 Burning Hot!";
  } else if (diff <= 5) {
    color = "#ff7b00";
    text = "Warm 🔥";
  } else if (diff <= 10) {
    color = "#f1c40f";
    text = "Cool-ish 🙂";
  } else {
    color = "#3498db";
    text = "Cold ❄️";
  }

  fill.style.width = percent + "%";
  fill.style.background = color;
  label.textContent = text;
}

// KEEP ALL YOUR ORIGINAL FUNCTIONS BELOW UNCHANGED EXCEPT THIS ADDITION:

function makeGuess() {
 let guess = parseInt(guessInput.value);

 if (isNaN(guess) || guess < 1 || guess > range) {
   document.getElementById("msg").textContent =
     `${playerName}, please enter a number between 1 and ${range}!`;
   guessInput.value = "";
   return;
 }

 guessCount++;

 let msg = "";

 if (guess > answer) msg = "Too high";
 else if (guess < answer) msg = "Too low";
 else msg = "Correct";

 let diff = Math.abs(guess - answer);

 updateThermometer(diff, range);

 if (guess !== answer && diff <= 2) {
   document.body.classList.add("hot-glow");
   setTimeout(() => document.body.classList.remove("hot-glow"), 300);
 }

 if (guess !== answer && diff <= 5) {
   document.querySelector(".container").classList.add("shake");
   setTimeout(() => document.querySelector(".container").classList.remove("shake"), 300);
 }

 if (guess !== answer) {
   let diffMsg = Math.abs(guess - answer);
   if (diffMsg <= 2) msg += " Hot";
   else if (diffMsg <= 5) msg += " Warm";
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

   playBeep(800, 300);
 }

 guessInput.value = "";
}