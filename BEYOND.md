# Above and Beyond Features

## 1. Input Validation
- **Location**: `makeGuess()` function in `script.js` (lines 152-158)
- **Description**: Checks if the guess is a valid number between 1 and the selected range (1-3, 1-10, and 1-100). If invalid, shows an error message and clears the input without counting it as a guess.
- **Why it improves the game**: Prevents invalid guesses from being processed and provides clear feedback.

## 2. Keyboard Support
- **Location**: Event listener added in `script.js` (lines 30-35)
- **Description**: Pressing Enter in the guess input field submits the guess, just like clicking the Guess button.
- **Why it improves the game**: Enhances usability by allowing keyboard-only play, which is faster and often more enjoyable for users. 

## 3. Score Quality Feedback
- **Location**: `makeGuess()` function in `script.js` (lines 175-181 and 195)
- **Description**: When the player guesses correctly, additional feedback is shown: "Amazing!" (1 guess), "Great!" (2-3 guesses), "Good!" (4-5 guesses), or "Keep trying!" (more than 5).
- **Why it improves the game**: Provides encouragement and motivation. It also makes wins significantly more satisfying.

## 4. Streak Tracking
- **Location**: Added `streak` variable and logic in `script.js` (lines 10, 185, 230); display in `index.html` (line 32) and updated in `updateScore()` (lines 255-257)
- **Description**: Tracks the current winning streak. Increments on each win, resets to 0 on give up. 
- **Why it improves the game**: Adds a fun statistic that encourages players to maintain streaks, increasing replayability and engagement.

## 5. Dark Mode Toggle
- **Location**: Button in `index.html` (line 14); event listener in `script.js` (lines 25-29); CSS styles in `style.css` (lines 201-235)
- **Description**: A toggle button that switches between light and dark themes, changing colors, backgrounds, and gradients.
- **Why it improves the game**: Adds a customizable feel and another option for users to enjoy the game in low-light environments. 

## 6. Animations
- **Location**: CSS animation in `style.css` (lines 237-244); applied in `script.js` (lines 197-200)
- **Description**: A bounce animation on the message when the player guesses correctly. (Ex. the sentences "Ava, Correct! You win! Good job!" bounce up and down when I input the correct number)
- **Why it improves the game**: Adds visual excitement and celebration for wins. Also makes the game significantly more visually satisfying.

## 7. Sound Effects
- **Location**: `playBeep()` function in `script.js` (lines 13-30); called on win (line 199)
- **Description**: Plays a short beep sound when the player guesses correctly using the Web Audio API.
- **Why it improves the game**: Provides auditory feedback for wins, enhancing the celebratory feel and making the game more immersive.

## 8. Enhanced Styling
- **Location**: Entire `style.css` file
- **Description**: The CSS includes gradients (the entire background behind the container is a moving pink gradient that cycles between lighter pink and darker pink), animations, hover effects (buttons like "Play," "Guess," "Give Up," "Dark Mode," become slightly larger and shifted when you hover over them), shadows (drop shadow when you hover over "Play," "Guess," "Give Up," and "Dark Mode" as well as when you hover over the container), and responsive design elements.
- **Why it improves the game**: Creates a visually appealing and modern interface that makes the game more enjoyable and professional-looking.