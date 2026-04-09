# Above and Beyond Features

## 1. Input Validation
- **Location**: `makeGuess()` function in `script.js` (lines 95-105)
- **Description**: Added checks to ensure the guess is a valid number and within the selected range (1 to range). Displays error messages if invalid.
- **Why it improves the game**: Prevents crashes from invalid inputs and provides better user feedback, making the game more robust and user-friendly.

## 2. Keyboard Support
- **Location**: Event listener added in `script.js` (lines 25-29)
- **Description**: Pressing Enter in the guess input field submits the guess, just like clicking the Guess button.
- **Why it improves the game**: Enhances usability by allowing keyboard-only play, which is faster and more convenient for users.

## 3. Score Quality Feedback
- **Location**: `makeGuess()` function in `script.js` (lines 125-131 and 145)
- **Description**: When the player guesses correctly, additional feedback is shown: "Amazing!" (1 guess), "Great!" (2-3 guesses), "Good!" (4-5 guesses), or "Keep trying!" (more than 5).
- **Why it improves the game**: Provides encouragement and motivation, making wins more satisfying and giving players a sense of achievement.

## 4. Streak Tracking
- **Location**: Added `streak` variable and logic in `script.js` (lines 10, 120, 185); display in `index.html` (line 32) and updated in `updateScore()` (lines 165-167)
- **Description**: Tracks the current winning streak. Increments on each win, resets to 0 on give up. Displayed in the stats section.
- **Why it improves the game**: Adds a fun statistic that encourages players to maintain streaks, increasing replayability and engagement.

## 5. Dark Mode Toggle
- **Location**: Button in `index.html` (line 14); event listener in `script.js` (lines 30-34); CSS styles in `style.css` (lines 201-235)
- **Description**: A toggle button that switches between light and dark themes, changing colors, backgrounds, and gradients.
- **Why it improves the game**: Provides user preference for visual comfort, especially in low-light environments, and adds a modern, customizable feel.

## 6. Animations
- **Location**: CSS animation in `style.css` (lines 237-244); applied in `script.js` (lines 147-150)
- **Description**: A bounce animation on the message when the player guesses correctly.
- **Why it improves the game**: Adds visual excitement and celebration for wins, making the feedback more engaging and fun.

## 7. Sound Effects
- **Location**: `playBeep()` function in `script.js` (lines 13-30); called on win (line 149)
- **Description**: Plays a short beep sound when the player guesses correctly using the Web Audio API.
- **Why it improves the game**: Provides auditory feedback for wins, enhancing the celebratory feel and making the game more immersive.

## 8. Enhanced Styling
- **Location**: Entire `style.css` file
- **Description**: The CSS includes gradients, animations, hover effects, shadows, and responsive design elements beyond basic styling.
- **Why it improves the game**: Creates a visually appealing and modern interface that makes the game more enjoyable and professional-looking.