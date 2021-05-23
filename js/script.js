// list of letters already guessed
const guessedLettersElement = document.querySelector(".guessed-letters");

// guess button
const guessButton = document.querySelector(".guess");

// box where user inputs a guess
const letterInput = document.querySelector(".letter");

// word in progress paragraph
const wordInProgress = document.querySelector(".word-in-progress");

// remaining guesses paragraph
const remainingGuesses = document.querySelector(".remaining");

// span to show remaining number of guesses
const numRemaining = document.querySelector(".remaining span");

// messages to the user
const message = document.querySelector(".message");

// play again button (hidden initially)
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// placeholder symbols function
const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●"); //why is this sufficient? shouldn't it need each letter to get replaced separately?
    }  
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// button listener
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const guessResult = checkInput(guess);
    if (guessResult) { //why is this? 
        makeGuess(guess);
    }
    letterInput.value = ""
});


const checkInput = function(input){ //input doesn't need to be defined, b/c it's a known html element? what about others?
    const acceptedLetter = /[a-zA-Z]/;
    //const newGuess = input.value; // why not use this, as we did in the potluck? too much?
    if (input.length === 0){
        message.innerText = "Please enter a letter from A to Z";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter from A to Z";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter only letters, no numbers or symbols.";
    } else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase(); // why can we use guess here, if it's only defined inside the button event listener?
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter. Try another.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters); 
    }
};


