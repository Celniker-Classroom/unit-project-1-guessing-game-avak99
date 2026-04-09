let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGames = 0;
let streak = 0;
let scores = [];
let times = [];
let startTime = 0;
let timerInterval = null;

// =====================
// DARK MODE
// =====================
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// =====================
// DATE
// =====================
function time() {
    return new Date().toLocaleString();
}

setInterval(() => {
    document.getElementById("date").textContent = time();
}, 1000);

// =====================
// TIMER
// =====================
function startTimer() {
    let seconds = 0;
    document.getElementById("timer").textContent = "Timer: 0s";

    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").textContent = "Timer: " + seconds + "s";
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// =====================
// PLAY
// =====================
function play() {
    let radios = document.getElementsByName("level");
    let range = 3;

    for (let r of radios) {
        if (r.checked) range = parseInt(r.value);
    }

    let custom = document.getElementById("customRange").value;

    // validation
    if (custom !== "") {
        if (isNaN(custom) || custom <= 0) {
            document.getElementById("msg").textContent =
                "Invalid custom range. Enter a positive number.";
            return;
        }
        range = parseInt(custom);
    }

    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    startTime = new Date().getTime();

    document.getElementById("msg").textContent =
        "Guess a number between 1 and " + range;

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;

    startTimer();
}

// =====================
// GUESS
// =====================
function makeGuess() {
    let guessInput = document.getElementById("guess").value;

    // validation
    if (guessInput === "" || isNaN(guessInput)) {
        document.getElementById("msg").textContent =
            "Please enter a valid number.";
        return;
    }

    let guess = parseInt(guessInput);

    if (guess < 0) {
        document.getElementById("msg").textContent =
            "No negative numbers allowed.";
        return;
    }

    guessCount++;

    let diff = Math.abs(guess - answer);
    let msg = "";
    let className = "";

    if (guess === answer) {
        msg = "Correct!";

        totalWins++;
        streak++;
        totalGames++;

        let endTime = new Date().getTime();
        let elapsed = (endTime - startTime) / 1000;
        times.push(elapsed);

        scores.push(guessCount);
        scores.sort((a,b)=>a-b);

        stopTimer();
        updateStats();
    } else {
        streak = 0;
        msg = guess > answer ? "Too high" : "Too low";
    }

    if (diff <= 2) {
        msg += " - Hot!";
        className = "hot";
    } else if (diff <= 5) {
        msg += " - Warm!";
        className = "warm";
    } else {
        msg += " - Cold!";
        className = "cold";
    }

    let msgEl = document.getElementById("msg");
    msgEl.textContent = msg;
    msgEl.className = className;
}

// =====================
// GIVE UP
// =====================
function giveUp() {
    streak = 0;
    totalGames++;

    document.getElementById("msg").textContent =
        "You gave up! The answer was " + answer;

    stopTimer();
    updateStats();
}

// =====================
// STATS
// =====================
function updateStats() {
    document.getElementById("wins").textContent =
        "Total wins: " + totalWins;

    document.getElementById("streak").textContent =
        "Current Streak: " + streak;

    let winPercent = totalGames === 0 ? 0 : (totalWins / totalGames) * 100;
    document.getElementById("winPercent").textContent =
        "Win %: " + winPercent.toFixed(1) + "%";

    document.getElementById("avgScore").textContent =
        "Average Score: " + (scores.reduce((a,b)=>a+b,0) / scores.length).toFixed(2);

    let leaderboard = document.getElementsByClassName("leaderboard");
    for (let i = 0; i < leaderboard.length; i++) {
        leaderboard[i].textContent = scores[i] || "--";
    }

    let fastest = Math.min(...times);
    let avgTime = times.reduce((a,b)=>a+b,0) / times.length;

    document.getElementById("fastest").textContent =
        "Fastest: " + fastest.toFixed(2) + "s";

    document.getElementById("avgTime").textContent =
        "Average Time: " + avgTime.toFixed(2) + "s";
}

// =====================
// KEYBOARD SUPPORT
// =====================
document.getElementById("guess").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});