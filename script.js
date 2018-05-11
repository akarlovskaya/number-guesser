/*jshint esversion: 6 */
/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game variables
let minNumber = 1;
let maxNumber = 10;
let guessesLeft = 3;
let correctAnswer = getRandomNumber(minNumber, maxNumber);
console.log(correctAnswer);

// UI Elements
const game = document.getElementById('game'),
      minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign min and max number to UI
minNumUI.textContent = minNumber;
maxNumUI.textContent = maxNumber;

// Listen for submit event
guessBtn.addEventListener('click', submit);

// Play again event EventListener
game.addEventListener('mousedown', function(e){
    if ( e.target.className === 'play-again' ) {
        // reload page
        window.location.reload();
    }
});


function submit(e) {
    //get user input and parse to number
    let userInput = parseInt(guessInput.value);
    message.textContent = '';

    if ( isNaN(userInput) || userInput < minNumber || userInput > maxNumber ) {
        setMessage(`Please enter a number berween ${minNumber} and ${maxNumber}`, 'red');
    } else {
        // check if won
        if ( userInput === correctAnswer ) {
            gameOver(true, `${correctAnswer} is correct number!`);
        } else {
            guessesLeft -= 1;

            if ( guessesLeft === 0 ) {
                gameOver(false, `Game over, you lost. ${correctAnswer} was correct number!`);
            } else {
                setMessage(`${userInput} is not correct. Guesses left ${guessesLeft}`, 'black');
            }

        }
    }
}

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Change text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play again';
    guessBtn.className = 'play-again';

}

//getRandomNumber
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Set message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}
