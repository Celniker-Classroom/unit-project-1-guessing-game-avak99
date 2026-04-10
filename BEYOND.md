***ABOVE AND BEYOND FEATURES***
CSS Styling and Visual Design
    __**Location:**__ CSS lines ~1–120 (body, container, buttons, title, input, labels)
    __**Description:**__ The background uses a moving pink gradient (#ffd1dc, #ff9bb3, #ffdde1, #ffc1cc) animated over 14 seconds, the container has a semi transparent white glass effect with blur and layered shadows, buttons use a pink gradient (#ff4d6d to #ff85a2) with hover scaling (slightly tilted when hovered) and glow, the title has animated gradient text with glow (and this looks even cooler in “Dark Mode”), and “Play,” “Guess,” “Give Up” and “Dark Mode” scale and glow when interacted with.
    __**Why:**__ The animations, gradients, and hover effects make the interface feel interactive and polished instead of flat.

Score Quality Feedback
    __**Location:**__ JS lines ~170–180 inside makeGuess()
    __**Description:**__ After winning, the game displays different messages based on guesses, such as "Amazing" for 1 guess, "Great job" for 3 or fewer, "Good job" for 5 or fewer, and "Nice work" otherwise.
    __**Why:**__ This gives performance-based feedback so players feel rewarded based on how efficiently they guessed.

Sound Effects and Animations (wave sound, confetti, bouncing text)
    __**Location:**__ JS lines ~20–45 (playBeep()), ~50–75 (triggerConfetti()), CSS ~300–320 (bounce)
    __**Description:**__ A wave sound plays briefly and confetti creates about 40 small colored squares that fall and rotate across the screen, and the win message bounces upward and back down (fun feeling!).
    __**Why:**__ The sound and animations make winning feel more exciting and visually satisfying.

Dark Mode Toggle
    __**Location:**__ HTML ~line 14, JS ~90–100, CSS ~180–260
    __**Description:**__ Clicking the button toggles a dark mode class that changes the background to dark brown gradients and switches text and button colors to lighter and pinkish-orange tones.
    __**Why:**__ This improves readability in different low-lighting conditions and gives users a visual preference option.

Custom Difficulty Levels
    __**Location:**__ HTML lines ~18–22, JS lines ~115–125
    __**Description:**__ The player selects Easy (1–3), Medium (1–10), or Hard (1–100), and that value is used to set the range for the random number.
    __**Why:**__ This lets players choose how challenging the game is.

Input Validation (out-of-range, non-numeric)
    __**Location:**__ JS lines ~135–145
    __**Description:**__ The game checks if the input is not a number or outside the selected range and shows an error message while clearing the input.
    __**Why:**__ This prevents invalid guesses from counting towards the score and keeps the game functioning correctly.

Streak Tracking
    __**Location:**__ JS lines ~1–10 (streak variable), ~175 (increment), ~235 (reset), HTML ~line 38
    __**Description:**__ The game tracks a streak that increases with each win and resets when the player gives up, and displays it in the stats section.
    __**Why:**__ This encourages consistent winning and adds a sense of progression, encouraging players to play again to beat their streak.

Keyboard Support (Enter key to guess)
    __**Location:**__ JS lines ~100–105
    __**Description:**__ The game allows players to click the enter key to guess instead of manually hovering over and pressing the “guess” button.
    __**Why:**__ This allows faster gameplay without needing to click the button, increasing player satisfaction.

Visual Effects (blue when cold, darker pink when hot)
    __**Location:**__ JS lines ~75–85 (setTempEffect()), CSS lines ~330–335
    __**Description:**__ The game applies classes that use hue-rotate, where cold uses hue-rotate(170deg) to shift the screen toward blue, warm uses hue-rotate(330deg) for pink tones, and hot uses hue-rotate(350deg) with higher saturation and brightness for a stronger pink/red.
    __**Why:**__ This gives clear visual feedback showing how close the guess is to the correct answer. It relates the functionality of the game to interesting visual details which make the users more engaged.

Voice Feedback ("too low", "too high", "correct")
    __**Location:**__ JS lines ~10–18 (speak()), lines ~150–165
    __**Description:**__ The game uses speech to say "Too high", "Too low", or "Correct" with normal and constant pitch, rate, and volume.
    __**Why:**__ This adds audio feedback as another form of feedback and makes the game more interactive and accessible.
